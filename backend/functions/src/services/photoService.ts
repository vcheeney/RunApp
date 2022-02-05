import { firestore } from "firebase-admin"
import { Storage } from "@google-cloud/storage"
import { CreatePhotoDto, Photo } from "../core/photo"
import {
	Collection,
	CustomValidateError,
	NoRecordFoundError,
} from "../core/utils"
import { bucketName } from "../config/cloudConfig"
import { isEmulator } from "../config/env"
const db = firestore()
const storage = new Storage()

export class PhotoService {
	async create(photo: CreatePhotoDto): Promise<Photo> {
		const docRec = await db.collection(Collection.PHOTOS).add(photo)
		const newPhoto: Photo = {
			...photo,
			id: docRec.id,
		}
		return newPhoto
	}

	async delete(photoId: string): Promise<boolean> {
		const docRef = await db.collection(Collection.PHOTOS).doc(photoId)
		try {
			const snapshot = await docRef.get()
			const photo = this.snapshotToPhoto(snapshot)
			const storagePath = this.photoPath(photo)
			if (!isEmulator())
				await storage.bucket(bucketName).file(storagePath).delete()
			await docRef.delete()
			return true
		} catch (error) {
			console.error(error)
			if (error instanceof NoRecordFoundError) {
				throw new CustomValidateError({
					name: {
						message: "La photo n'existe pas",
					},
				})
			} else {
				throw error
			}
		}
	}

	async findById(photoId: string): Promise<Photo> {
		const docRef = await db.collection(Collection.PHOTOS).doc(photoId).get()
		const photo: Photo = this.snapshotToPhoto(docRef)
		return photo
	}

	private snapshotToPhoto(
		docRef: firestore.DocumentSnapshot<firestore.DocumentData>
	): Photo {
		return {
			...docRef.data(),
			id: docRef.id,
		} as Photo
	}

	async findMany(
		eventId: string,
		albumsIds: string[],
		lastPagePhotoId?: string,
		bibNumber?: string
	): Promise<Photo[]> {
		// Query photos for a certain event
		let query = db.collection(Collection.PHOTOS).where("eventId", "==", eventId)

		// If albumsIds is defined, filter only photos for selected albums
		if (albumsIds.length) {
			query = query.where("albumId", "in", albumsIds)
		}

		// If bibNumber is defined, filter only photos for selected bibNumber
		if (bibNumber) {
			query = query.where("bibNumbers", "array-contains", bibNumber)
		}

		// Apply pagination
		// if (lastPagePhotoId) {
		// 	query = query.startAfter(lastPagePhotoId)
		// }
		// query = query.limit(PAGE_SIZE)

		const photosRef = await query.get()

		return photosRef.docs.map((doc) => {
			return {
				...doc.data(),
				id: doc.id,
			} as Photo
		})
	}

	async updateBibs(
		photoId: string,
		bibs: string[],
		date = new Date()
	): Promise<void> {
		const photoRef = db.collection(Collection.PHOTOS).doc(photoId)
		await photoRef.update({
			bibNumbers: bibs,
			haveBibsBeenChecked: true,
			analysisDate: date,
		})
	}

	photoPath(photo: Photo) {
		return `organizations/${photo.organizationId}/events/${photo.eventId}/albums/${photo.albumId}/${photo.name}`
	}
}
