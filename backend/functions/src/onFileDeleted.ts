import * as admin from "firebase-admin"
import * as functions from "firebase-functions"
import { AlbumService } from "./services/albumService"
import { EventService } from "./services/eventService"
import { OrganizationService } from "./services/organizationService"
import StorageHelper from "./StorageHelper"

// Cloud function called on each file stored in Firebase Storage
export const onFileDeleted = functions.storage
	.object()
	.onDelete(async (object) => {
		try {
			const bucket = admin.storage().bucket(object.bucket)
			if (!object.name || !object.contentType || !object.mediaLink) return

			const file = bucket.file(object.name)

			const path = object.name

			if (StorageHelper.getFilePurpose(path) === "PHOTO") {
				await removePhotoObjectInFirestore(object, file)
			}
		} catch (error) {
			functions.logger.error("Wrapping error handler: ", error)
		}

		return
	})

async function removePhotoObjectInFirestore(object, file) {
	try {
		// Make sure it's an image
		if (!object.contentType.startsWith("image/")) {
			functions.logger.log("This is not an image.", file)
			return
		}

		const orgId = StorageHelper.getOrgId(object.name)
		const eventId = StorageHelper.getEventId(object.name)
		const albumId = StorageHelper.getAlbumId(object.name)

		try {
			const organizationService = new OrganizationService()
			const eventService = new EventService()
			const albumService = new AlbumService()

			// Make sure the organization exists, the event exists, and the album exists
			const org = await organizationService.findById(orgId)
			const event = await eventService.findById(orgId, eventId)
			const album = await albumService.findById(orgId, eventId, albumId)

			// Decrenebt the amount of photos in the organization, event, and album
			await organizationService.decrementPhotoCount(org.id)
			await eventService.decrementPhotoCount(org.id, event.id)
			await albumService.decrementPhotoCount(org.id, event.id, album.id)
		} catch (error) {
			functions.logger.error(error)
			return
		}
	} catch (error) {
		functions.logger.error(error)
	}
}
