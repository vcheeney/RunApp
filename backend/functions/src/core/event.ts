import { CustomValidateError, TypedFieldErrors } from "./utils"

// Constants
export const EVENT_NAME_MIN = 3
export const EVENT_NAME_MAX = 50
export const EVENT_URI_MIN = 3
export const EVENT_URI_MAX = 50

// Data structures
export type RacingEvent = {
	id: string
	organisationId: string
	createdDate: Date
	updatedDate: Date
	photoCount: number
	/**
	 * Le nom de l'événement
	 * @isString Le nom de l'événement est requis
	 * @minLength 3 Le nom de l'événement doit contenir au moins 3 caractères
	 * @maxLength 50 Le nom de l'événement doit contenir au plus 50 caractères
	 * @example "Bonjour Automne 2021"
	 */
	name: string
	/**
	 * L'URI de l'événement
	 * @isString L'URI de l'événement est requis
	 * @minLength 3 L'URI de l'événement doit contenir au moins 3 caractères
	 * @maxLength 50 L'URI de l'événement doit contenir au plus 50 caractères
	 * @unique true Le URI de l'événement doit être unique
	 * @example "bonjour-automne-2021"
	 */
	uri: string
	/**
	 * La date de l'événement
	 * @isDate La date doit être une date valide
	 * @example 2021-09-12
	 */
	eventDate: Date
	/**
	 * @example "https://firebasestorage.googleapis.com/b/bucket/o/20210912.jpg"
	 */
	image: string
}

export type CreateEventDto = Pick<
	RacingEvent,
	"eventDate" | "name" | "image" | "uri"
>

// Functions
export function createEvent(
	organisationId: string,
	dto: CreateEventDto,
	date = new Date()
): Omit<RacingEvent, "id"> {
	const { eventDate, name, image, uri } = dto
	const errors: TypedFieldErrors<CreateEventDto> = {}

	if (!eventDate) {
		errors.eventDate = {
			message: "The event date is required",
			value: eventDate,
		}
	}

	if (!name) {
		errors.name = {
			message: "The event name is required",
			value: name,
		}
	} else if (typeof name !== "string") {
		errors.name = {
			message: "The event name must be a string",
			value: name,
		}
	} else if (name.length < EVENT_NAME_MIN) {
		errors.name = {
			message: `The event name must have at least ${EVENT_NAME_MIN} characters`,
			value: name,
		}
	} else if (name.length > EVENT_NAME_MAX) {
		errors.name = {
			message: `The event name must have at most ${EVENT_NAME_MAX} characters`,
			value: name,
		}
	}

	if (image && typeof image !== "string") {
		errors.image = {
			message: "The image must be a string",
			value: image,
		}
	}

	if (!uri) {
		errors.uri = {
			message: "The event uri is required",
			value: uri,
		}
	} else if (typeof uri !== "string") {
		errors.uri = {
			message: "The event uri must be a string",
			value: uri,
		}
	} else if (uri.length < EVENT_URI_MIN) {
		errors.uri = {
			message: `The event uri must have at least ${EVENT_URI_MIN} characters`,
			value: uri,
		}
	} else if (uri.length > EVENT_URI_MAX) {
		errors.uri = {
			message: `The event uri must have at most ${EVENT_URI_MAX} characters`,
			value: uri,
		}
	} else if (!/^[a-z0-9-]+$/.test(uri)) {
		errors.uri = {
			message:
				"The event uri must only contain lowercase letters, numbers and hyphens",
			value: uri,
		}
	}

	if (Object.keys(errors).length > 0) {
		throw new CustomValidateError(errors)
	}

	return {
		organisationId,
		createdDate: date,
		updatedDate: date,
		photoCount: 0,
		eventDate,
		name,
		uri,
		image,
	}
}

export type UpdateEventDto = {
	id: string
	name: string
	uri: string
	eventDate: Date
	image: string
}
