import { firestore } from "firebase-admin"
import {
	createEvent,
	CreateEventDto,
	RacingEvent,
	UpdateEventDto,
} from "../core/event"
import {
	Collection,
	CustomValidateError,
	NoRecordFoundError,
	convertFireStoreDate,
} from "../core/utils"
const db = firestore()

export class EventService {
	async create(orgId: string, dto: CreateEventDto): Promise<RacingEvent> {
		const event = createEvent(orgId, dto)

		const alreadyExists = await this.exists(orgId, event.uri)

		if (alreadyExists) {
			throw new CustomValidateError<CreateEventDto>({
				uri: {
					message: "This URI is already taken",
					value: event.uri,
				},
			})
		}

		try {
			const docRef = await db
				.collection(Collection.ORGANIZATIONS)
				.doc(orgId)
				.collection(Collection.EVENTS)
				.add(event)
			const newEvent: RacingEvent = {
				...event,
				id: docRef.id,
			}

			return newEvent
		} catch (error) {
			throw new CustomValidateError<CreateEventDto>({
				name: {
					message: "An error occurred while creating the event",
				},
			})
		}
	}

	async update(
		orgId: string,
		updateEventDto: UpdateEventDto
	): Promise<RacingEvent> {
		const eventExists = await this.existsById(orgId, updateEventDto.id)

		if (!eventExists) {
			throw new CustomValidateError<CreateEventDto>({
				name: {
					message: "The event does not exist",
				},
			})
		}

		try {
			const docRef = await db
				.collection(Collection.ORGANIZATIONS)
				.doc(orgId)
				.collection(Collection.EVENTS)
				.doc(updateEventDto.id)
				.get()

			await docRef.ref.update(updateEventDto)

			return await this.findById(orgId, updateEventDto.id)
		} catch (error) {
			console.log(error)
			throw new CustomValidateError<CreateEventDto>({
				name: {
					message: "An error occurred while updating the event",
				},
			})
		}
	}

	async exists(orgId: string, uri: string): Promise<boolean> {
		try {
			await this.findByUri(orgId, uri)
			return true
		} catch (error) {
			if (error instanceof NoRecordFoundError) {
				return false
			}
			return true
		}
	}

	async existsById(orgId: string, id: string): Promise<boolean> {
		try {
			await this.findById(orgId, id)
			return true
		} catch (error) {
			if (error instanceof NoRecordFoundError) {
				return false
			}
			return true
		}
	}

	async findAllForOrg(orgId: string): Promise<RacingEvent[]> {
		const docRef = await db
			.collection(Collection.ORGANIZATIONS)
			.doc(orgId)
			.collection(Collection.EVENTS)
			.get()

		const events: RacingEvent[] = docRef.docs.map((doc) => {
			return convertFireStoreDate({
				...doc.data(),
				id: doc.id,
			}) as RacingEvent
		})

		return events
	}

	async findById(orgId: string, eventId: string): Promise<RacingEvent> {
		const docRef = await db
			.collection(Collection.ORGANIZATIONS)
			.doc(orgId)
			.collection(Collection.EVENTS)
			.doc(eventId)
			.get()

		if (!docRef.exists) {
			throw new NoRecordFoundError("No event found with this ID")
		}

		return convertFireStoreDate({
			...docRef.data(),
			id: docRef.id,
		}) as RacingEvent
	}

	async findByUri(orgId: string, uri: string): Promise<RacingEvent> {
		const eventsRef = db
			.collection(Collection.ORGANIZATIONS)
			.doc(orgId)
			.collection(Collection.EVENTS)
			.where("uri", "==", uri)
		const querySnapshot = await eventsRef.get()

		if (querySnapshot.empty) {
			throw new NoRecordFoundError(
				"No event found with this URI in this organization"
			)
		} else if (querySnapshot.size > 1) {
			throw new Error(
				"Multiple events found with this URI in this organization"
			)
		}

		const docs = querySnapshot.docs.map((doc) => {
			return convertFireStoreDate({
				...doc.data(),
				id: doc.id,
			}) as RacingEvent
		})

		return docs[0]
	}

	async incrementPhotoCount(orgId: string, eventId: string): Promise<void> {
		return this.incrementPhotoCountByValue(orgId, eventId, 1)
	}

	async decrementPhotoCount(orgId: string, eventId: string): Promise<void> {
		return this.incrementPhotoCountByValue(orgId, eventId, -1)
	}

	async incrementPhotoCountByValue(
		orgId: string,
		eventId: string,
		value: number
	): Promise<void> {
		const eventRef = db
			.collection(Collection.ORGANIZATIONS)
			.doc(orgId)
			.collection(Collection.EVENTS)
			.doc(eventId)
		await eventRef.update({
			photoCount: firestore.FieldValue.increment(value),
		})
	}

	async resetPhotoCountForEachEvent(): Promise<void> {
		const eventsRef = db.collectionGroup(Collection.EVENTS)
		const querySnapshot = await eventsRef.get()

		const batch = db.batch()
		querySnapshot.docs.forEach((doc) => {
			batch.update(doc.ref, {
				photoCount: 0,
			})
		})

		await batch.commit()
	}
}
