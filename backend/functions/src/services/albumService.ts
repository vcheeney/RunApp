import {
	DocumentData,
	DocumentReference,
	QueryDocumentSnapshot,
} from "@google-cloud/firestore"
import { firestore } from "firebase-admin"
import {
	Album,
	createAlbum,
	CreateAlbumDto,
	UpdateAlbumDto,
} from "../core/album"
import {
	Collection,
	CustomValidateError,
	NoRecordFoundError,
} from "../core/utils"
const db = firestore()

export class AlbumService {
	async create(
		orgId: string,
		eventId: string,
		dto: CreateAlbumDto
	): Promise<Album> {
		const album = createAlbum(orgId, eventId, dto)

		const alreadyExists = await this.exists(orgId, eventId, album.uri)

		if (alreadyExists) {
			throw new CustomValidateError<CreateAlbumDto>({
				uri: {
					message: "This URI is already used by another album",
					value: album.uri,
				},
			})
		}

		try {
			const docRef = await db
				.collection(Collection.ORGANIZATIONS)
				.doc(orgId)
				.collection(Collection.EVENTS)
				.doc(eventId)
				.collection(Collection.ALBUMS)
				.add(album)
			const newAlbum = {
				...album,
				id: docRef.id,
			}

			return newAlbum
		} catch (error) {
			throw new CustomValidateError<CreateAlbumDto>({
				name: {
					message: "An error occurred while creating the album",
				},
			})
		}
	}

	async update(
		orgId: string,
		eventId: string,
		albumUri: string,
		albumDto: UpdateAlbumDto
	): Promise<Album> {
		let albumRef: DocumentReference<DocumentData>
		try {
			albumRef = (await this.findSnapshotByUri(orgId, eventId, albumUri)).ref
		} catch (error) {
			if (error instanceof NoRecordFoundError) {
				throw new CustomValidateError<UpdateAlbumDto>({
					name: {
						message: "This album does not exist",
					},
				})
			} else {
				throw error
			}
		}

		if (albumUri != albumDto.uri) {
			const alreadyExists = await this.exists(orgId, eventId, albumDto.uri)
			if (alreadyExists) {
				throw new CustomValidateError<CreateAlbumDto>({
					uri: {
						message: "This URI is already used by another album",
						value: albumDto.uri,
					},
				})
			}
		}

		try {
			await albumRef.update(albumDto)
			return this.albumRefToAlbum(albumRef)
		} catch (error) {
			console.log(error)
			throw new CustomValidateError<UpdateAlbumDto>({
				name: {
					message: "An error occurred while updating the album",
				},
			})
		}
	}

	async exists(orgId: string, eventId: string, uri: string): Promise<boolean> {
		try {
			await this.findByUri(orgId, eventId, uri)
			return true
		} catch (error) {
			if (error instanceof NoRecordFoundError) {
				return false
			}
			return true
		}
	}

	async findAllForOrganization(orgId: string): Promise<Album[]> {
		const albumsRef = db.collectionGroup(Collection.ALBUMS)
		const querySnapshot = await albumsRef
			.where("organizationId", "==", orgId)
			.get()

		const docs = querySnapshot.docs.map((doc) => {
			return {
				...doc.data(),
				id: doc.id,
			} as Album
		})

		return docs
	}

	async findAllForEvent(orgId: string, eventId: string): Promise<Album[]> {
		const albumsRef = db
			.collection(Collection.ORGANIZATIONS)
			.doc(orgId)
			.collection(Collection.EVENTS)
			.doc(eventId)
			.collection(Collection.ALBUMS)
		const querySnapshot = await albumsRef.get()

		const docs = querySnapshot.docs.map((doc) => {
			return {
				...doc.data(),
				id: doc.id,
			} as Album
		})

		return docs
	}

	async findById(
		orgId: string,
		eventId: string,
		albumId: string
	): Promise<Album> {
		const albumRef = db
			.collection(Collection.ORGANIZATIONS)
			.doc(orgId)
			.collection(Collection.EVENTS)
			.doc(eventId)
			.collection(Collection.ALBUMS)
			.doc(albumId)
		return await this.albumRefToAlbum(albumRef)
	}

	private async albumRefToAlbum(albumRef: DocumentReference<DocumentData>) {
		const doc = await albumRef.get()

		if (!doc.exists) {
			throw new NoRecordFoundError("No album found with this id")
		}

		return {
			...doc.data(),
			id: doc.id,
		} as Album
	}

	async findSnapshotByUri(
		orgId: string,
		eventId: string,
		uri: string
	): Promise<QueryDocumentSnapshot<DocumentData>> {
		const albumsRef = db
			.collection(Collection.ORGANIZATIONS)
			.doc(orgId)
			.collection(Collection.EVENTS)
			.doc(eventId)
			.collection(Collection.ALBUMS)
		const querySnapshot = await albumsRef.where("uri", "==", uri).get()

		if (querySnapshot.empty) {
			throw new NoRecordFoundError(
				"No album found with this URI for this event"
			)
		} else if (querySnapshot.size > 1) {
			throw new Error("Many albums found with this URI for this event")
		}

		return querySnapshot.docs[0]
	}

	async findByUri(orgId: string, eventId: string, uri: string): Promise<Album> {
		const albumsRef = db
			.collection(Collection.ORGANIZATIONS)
			.doc(orgId)
			.collection(Collection.EVENTS)
			.doc(eventId)
			.collection(Collection.ALBUMS)
		const querySnapshot = await albumsRef.where("uri", "==", uri).get()

		if (querySnapshot.empty) {
			throw new NoRecordFoundError(
				"No album found with this URI for this event"
			)
		} else if (querySnapshot.size > 1) {
			throw new Error("Many albums found with this URI for this event")
		}

		const doc = querySnapshot.docs[0]

		return {
			...doc.data(),
			id: doc.id,
		} as Album
	}

	async incrementPhotoCount(
		orgId: string,
		eventId: string,
		albumId: string
	): Promise<void> {
		return this.incrementPhotoCountByValue(orgId, eventId, albumId, 1)
	}

	async decrementPhotoCount(
		orgId: string,
		eventId: string,
		albumId: string
	): Promise<void> {
		return this.incrementPhotoCountByValue(orgId, eventId, albumId, -1)
	}

	async incrementPhotoCountByValue(
		orgId: string,
		eventId: string,
		albumId: string,
		value: number
	): Promise<void> {
		const albumRef = db
			.collection(Collection.ORGANIZATIONS)
			.doc(orgId)
			.collection(Collection.EVENTS)
			.doc(eventId)
			.collection(Collection.ALBUMS)
			.doc(albumId)
		await albumRef.update({
			photoCount: firestore.FieldValue.increment(value),
		})
	}

	async resetPhotoCountForEachAlbum(): Promise<void> {
		const albumsRef = db.collectionGroup(Collection.ALBUMS)
		const querySnapshot = await albumsRef.get()

		const batch = db.batch()
		querySnapshot.docs.forEach((doc) => {
			batch.update(doc.ref, {
				photoCount: 0,
			})
		})

		await batch.commit()
	}
}
