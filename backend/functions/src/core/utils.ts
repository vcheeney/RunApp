import { ValidateError } from "@tsoa/runtime"
import { FieldErrors } from "tsoa"
import { firestore } from "firebase-admin"

export enum Collection {
	ORGANIZATIONS = "ORGANIZATIONS",
	EVENTS = "EVENTS",
	ALBUMS = "ALBUMS",
	PHOTOS = "PHOTOS",
	BIBS = "BIBS",
}

export const slugify = (text: string): string => {
	return text
		.toString() // Cast to string
		.toLowerCase() // Convert the string to lowercase letters
		.normalize("NFD") // The normalize() method returns the Unicode Normalization Form of a given string.
		.trim() // Remove whitespace from both sides of a string
		.replace(/\s+/g, "-") // Replace spaces with -
		.replace(/[^\w-]+/g, "") // Remove all non-word chars
		.replace(/--+/g, "-") // Replace multiple - with single -
}

export type TypedFieldErrors<T> = {
	[K in keyof T]?: {
		message: string
		value?: any
	}
}

export class CustomValidateError<T> extends ValidateError {
	constructor(fields: TypedFieldErrors<T>) {
		if (Object.keys(fields).length === 0) {
			throw new Error("No fields provided")
		}
		super(fields as FieldErrors, "Data is invalid")
		this.name = "CustomValidateError"
	}
}

export class NoRecordFoundError extends Error {
	constructor(message: string) {
		super(message)
		this.name = "NoRecordFoundError"
	}
}

export class AuthorizationError extends Error {
	constructor(message: string) {
		super(message)
		this.name = "AuthorizationError"
	}
}

export const convertFireStoreDate = (firebaseObject: any) => {
	const keys = ["createdDate", "eventDate", "updatedDate"]
	const convertedObject = {}

	for (const [key, value] of Object.entries(firebaseObject)) {
		if (keys.includes(key)) {
			convertedObject[key] = getDateString(
				(value as firestore.Timestamp).toDate()
			)
		} else {
			convertedObject[key] = value
		}
	}

	return convertedObject
}

function twoDigits(number: number) {
	return number < 10 ? `0${number}` : number
}

export function getDateString(date: Date): string {
	return `${date.getFullYear()}-${twoDigits(date.getMonth() + 1)}-${twoDigits(
		date.getDate()
	)}`
}
