import * as admin from "firebase-admin"
import * as functions from "firebase-functions"
import http from "http"
import https from "https"
import sizeOf from "image-size"
import { CreatePhotoDto } from "./core/photo"
import { AlbumService } from "./services/albumService"
import { EventService } from "./services/eventService"
import { OrganizationService } from "./services/organizationService"
import { PhotoService } from "./services/photoService"
import StorageHelper from "./StorageHelper"

// Cloud function called on each file stored in Firebase Storage
export const onFileUploaded = functions.storage
	.object()
	.onFinalize(async (object) => {
		try {
			const bucket = admin.storage().bucket(object.bucket)
			if (!object.name || !object.contentType || !object.mediaLink) return

			const file = bucket.file(object.name)

			const path = object.name

			if (StorageHelper.getFilePurpose(path) === "PHOTO") {
				await createPhotoObjectInFirestore(object, file)
			} else if (
				StorageHelper.getFilePurpose(path) === "LOGO" ||
				StorageHelper.getFilePurpose(path) === "BANNER"
			) {
				// do nothing
			} else {
				functions.logger.log("File is not an expected document")
			}
		} catch (error) {
			functions.logger.error("Wrapping error handler: ", error)
		}

		return
	})

async function createPhotoObjectInFirestore(object, file) {
	try {
		// Make sure it's an image
		if (!object.contentType.startsWith("image/")) {
			functions.logger.log("This is not an image.", file)
			file.delete()
			return
		}

		const orgId = StorageHelper.getOrgId(object.name)
		const eventId = StorageHelper.getEventId(object.name)
		const albumId = StorageHelper.getAlbumId(object.name)
		const photoName = StorageHelper.getPhotoName(object.name)

		try {
			const organizationService = new OrganizationService()
			const eventService = new EventService()
			const albumService = new AlbumService()

			// Make sure the organization exists, the event exists, and the album exists
			const org = await organizationService.findById(orgId)
			const event = await eventService.findById(orgId, eventId)
			const album = await albumService.findById(orgId, eventId, albumId)

			// // UPCOMMING TODO: Check if the organization has not exceeded their quota
			// // If it has, throw an error

			const dimensions = await getImageDimensions(object.mediaLink)
			const dto: CreatePhotoDto = {
				organizationId: org.id,
				eventId: event.id,
				albumId: album.id,
				name: photoName,
				bibNumbers: [],
				haveBibsBeenChecked: false,
				previewImageUrl: object.mediaLink, // UPCOMMING TODO: generate preview image
				sourceImageUrl: object.mediaLink,
				price: 0,
				width: dimensions.width,
				height: dimensions.height,
				portrait: dimensions.width < dimensions.height,
			}

			const photoService = new PhotoService()
			await photoService.create(dto)

			// Increment the amount of photos in the organization, event, and album
			await organizationService.incrementPhotoCount(org.id)
			await eventService.incrementPhotoCount(org.id, event.id)
			await albumService.incrementPhotoCount(org.id, event.id, album.id)
		} catch (error) {
			functions.logger.error(error)
			file.delete()
			return
		}
	} catch (error) {
		functions.logger.error(error)
	}
}

async function getImageDimensions(
	imageUrl: string
): Promise<{ width: number; height: number }> {
	const options = new URL(imageUrl)
	return new Promise((resolve, reject) => {
		const request = (options.protocol === "https:" ? https : http).get(
			options,
			function (response) {
				const chunks: Array<any> = []
				response
					.on("data", function (chunk) {
						chunks.push(chunk)
					})
					.on("end", checkDimensions)
					.on("close", checkDimensions)
				function checkDimensions() {
					try {
						const buffer = Buffer.concat(chunks)
						const dimensions = sizeOf(buffer)
						if (dimensions.width && dimensions.height) {
							resolve({
								width: dimensions.width,
								height: dimensions.height,
							})
						}
						resolve({
							width: 0,
							height: 0,
						})
					} catch (error) {
						reject(error)
					}
				}
			}
		)
	})
}
