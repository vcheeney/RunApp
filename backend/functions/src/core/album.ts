import { CustomValidateError, TypedFieldErrors } from "./utils"

// Constants
export const ALBUM_NAME_MIN = 3
export const ALBUM_NAME_MAX = 50
export const ALBUM_URI_MIN = 3
export const ALBUM_URI_MAX = 50

// Data structures
export type Album = {
	id: string
	organizationId: string
	eventId: string
	createdDate: Date
	updatedDate: Date
	photoCount: number
	/**
	 * Le nom de l'album
	 * @isString Le nom de l'album est requis
	 * @minLength 3 Le nom de l'album doit avoir au moins 3 caractères
	 * @maxLength 50 Le nom de l'album doit avoir au plus 50 caractères
	 * @example "21 km"
	 */
	name: string
	/**
	 * Le URI de l'album
	 * @isString Le URI de l'album est requis
	 * @minLength 3 Le URI de l'album doit avoir au moins 3 caractères
	 * @maxLength 50 Le URI de l'album doit avoir au plus 50 caractères
	 * @unique true Le URI de l'album doit être unique
	 * @example "21km"
	 */
	uri: string
}

export type CreateAlbumDto = Pick<Album, "name" | "uri">

export type UpdateAlbumDto = CreateAlbumDto

// Functions
export function createAlbum(
	organizationId: string,
	eventId: string,
	dto: CreateAlbumDto,
	date = new Date()
): Omit<Album, "id"> {
	const { name, uri } = dto
	const errors: TypedFieldErrors<CreateAlbumDto> = {}

	if (!name) {
		errors.name = {
			message: "The album name is required",
			value: name,
		}
	} else if (typeof name !== "string") {
		errors.name = {
			message: "The album name must be a string",
			value: name,
		}
	} else if (name.length < ALBUM_NAME_MIN) {
		errors.name = {
			message: `The album name must have at least ${ALBUM_NAME_MIN} characters`,
			value: name,
		}
	} else if (name.length > ALBUM_NAME_MAX) {
		errors.name = {
			message: `The album name must have at most ${ALBUM_NAME_MAX} characters`,
			value: name,
		}
	}

	if (!uri) {
		errors.uri = {
			message: "The album URI is required",
			value: uri,
		}
	} else if (typeof uri !== "string") {
		errors.uri = {
			message: "The album URI must be a string",
			value: uri,
		}
	} else if (uri.length < ALBUM_URI_MIN) {
		errors.uri = {
			message: `The album URI must have at least ${ALBUM_URI_MIN} characters`,
			value: uri,
		}
	} else if (uri.length > ALBUM_URI_MAX) {
		errors.uri = {
			message: `The album URI must have at most ${ALBUM_URI_MAX} characters`,
			value: uri,
		}
	} else if (!/^[a-z0-9-]+$/.test(uri)) {
		errors.uri = {
			message:
				"The album URI must only contain lowercase letters, numbers and hyphens",
			value: uri,
		}
	}

	if (Object.keys(errors).length > 0) {
		throw new CustomValidateError(errors)
	}

	return {
		organizationId,
		eventId,
		createdDate: date,
		updatedDate: date,
		photoCount: 0,
		name,
		uri,
	}
}
