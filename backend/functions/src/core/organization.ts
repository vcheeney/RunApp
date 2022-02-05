import { CustomValidateError, slugify, TypedFieldErrors } from "./utils"
import { User } from "./user"

// Constants
export const ORGANIZATION_NAME_MIN = 5
export const ORGANIZATION_NAME_MAX = 50
export const ORGANIZATION_URI_MIN = 3
export const ORGANIZATION_URI_MAX = 50

// Data structures
export type Organization = {
	id: string
	createdDate: Date
	updatedDate: Date
	photoCount: number
	membersIds: string[]
	members: Array<{
		userId: string
		name: string
		permissions: string[]
	}>
	/**
	 * Le nom de l'organisation
	 * @isString Le nom de l'organisation est requis
	 * @minLength 5 Le nom de l'organisation doit faire au moins 5 caractères
	 * @maxLength 50 Le nom de l'organisation doit faire au plus 50 caractères
	 * @example "Grand Défi"
	 */
	name: string
	/**
	 * L'URI de l'organisation
	 * @isString L'URI de l'organisation est requis
	 * @minLength 3 L'URI de l'organisation doit faire au moins 3 caractères
	 * @maxLength 50 L'URI de l'organisation doit faire au plus 50 caractères
	 * @unique true Le URI de l'organisation doit être unique
	 * @example "grand-defi"
	 */
	uri: string
	/**
	 * @example "https://firebasestorage.googleapis.com/b/bucket/o/20210912.jpg"
	 */
	logo: string
	/**
	 * @example "https://firebasestorage.googleapis.com/b/bucket/o/20210912.jpg"
	 */
	banner: string
}

export type CreateOrganizationDto = Pick<
	Organization,
	"name" | "uri" | "logo" | "banner"
>

// Functions
export function createOrganization(
	dto: CreateOrganizationDto,
	user: User,
	date = new Date()
): Omit<Organization, "id"> {
	const { name, uri, logo, banner } = dto
	const errors: TypedFieldErrors<CreateOrganizationDto> = {}

	if (!name) {
		errors.name = {
			message: "The name is required",
			value: name,
		}
	} else if (typeof name !== "string") {
		errors.name = {
			message: "The name must be a string",
			value: name,
		}
	} else if (name.length < ORGANIZATION_NAME_MIN) {
		errors.name = {
			message: `The name must be at least ${ORGANIZATION_NAME_MIN} characters`,
			value: name,
		}
	} else if (name.length > ORGANIZATION_NAME_MAX) {
		errors.name = {
			message: `The name must be at most ${ORGANIZATION_NAME_MAX} characters`,
			value: name,
		}
	}

	if (!uri) {
		errors.uri = {
			message: "The URI is required",
			value: uri,
		}
	} else if (typeof uri !== "string") {
		errors.uri = {
			message: "The URI must be a string",
			value: uri,
		}
	} else if (uri.length < ORGANIZATION_URI_MIN) {
		errors.uri = {
			message: `The URI must be at least ${ORGANIZATION_URI_MIN} characters`,
			value: uri,
		}
	} else if (uri.length > ORGANIZATION_URI_MAX) {
		errors.uri = {
			message: `The URI must be at most ${ORGANIZATION_URI_MAX} characters`,
			value: uri,
		}
	} else if (!/^[a-z0-9-]+$/.test(uri)) {
		errors.uri = {
			message:
				"The URI must only contain lowercase letters, numbers and dashes",
			value: uri,
		}
	}

	if (Object.keys(errors).length > 0) {
		throw new CustomValidateError(errors)
	}

	return {
		createdDate: date,
		updatedDate: date,
		photoCount: 0,
		membersIds: [user.id],
		members: [
			{
				userId: user.id,
				name: user.name,
				permissions: ["all"],
			},
		],
		name,
		uri,
		banner,
		logo,
	}
}
export type UpdateOrganizationDto = {
	id: string
	name: string
	uri: string
	logo: string
	banner: string
}
