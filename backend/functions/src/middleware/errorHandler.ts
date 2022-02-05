import { ValidateError } from "@tsoa/runtime"
import {
	Response as ExResponse,
	Request as ExRequest,
	NextFunction,
} from "express"
import { AuthorizationError, NoRecordFoundError } from "../core/utils"

type ErrorResponseBody = {
	type: string
	message: string
	details?: any
}

export function errorHandler(
	err: unknown,
	req: ExRequest,
	res: ExResponse<ErrorResponseBody>,
	next: NextFunction
): ExResponse | void {
	if (err instanceof ValidateError) {
		console.warn(`Caught Validation Error for ${req.path}:`, err.fields)
		return res.status(422).json({
			message: "Data validation error",
			details: err?.fields,
			type: err.name,
		})
	}

	if (err instanceof AuthorizationError) {
		return res.status(401).json({
			type: err.name,
			message: err.message,
			details: Object.keys(err).reduce((acc, key) => {
				acc[key] = err[key]
				return acc
			}, {}),
		})
	}

	if (err instanceof NoRecordFoundError) {
		return res.status(404).json({
			type: err.name,
			message: err.message,
			details: Object.keys(err).reduce((acc, key) => {
				acc[key] = err[key]
				return acc
			}, {}),
		})
	}

	if (err instanceof Error) {
		return res.status(500).json({
			type: err.name,
			message: err.message || "Internal Server Error",
			details: Object.keys(err).reduce((acc, key) => {
				acc[key] = err[key]
				return acc
			}, {}),
		})
	}

	next()
}
