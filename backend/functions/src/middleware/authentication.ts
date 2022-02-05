import { Request as ExRequest } from "express"
import * as admin from "firebase-admin"
import { AuthorizationError } from "../core/utils"

export interface AuthenticatedRequest extends ExRequest {
	user: {
		id: string
		name: string
	}
}

export async function expressAuthentication(
	req: ExRequest,
	securityName: string,
	scopes?: string[]
): Promise<any> {
	if (securityName === "firebase") {
		const { authorization } = req.headers
		if (!authorization)
			return Promise.reject(
				new AuthorizationError("The authentication header is missing")
			)

		console.log(authorization)

		const token = authorization.split(" ")
		if (token[0] !== "Bearer")
			return Promise.reject(
				new AuthorizationError("The authentication header is invalid")
			)
		const idToken = token[1]

		try {
			const decodedToken = await admin.auth().verifyIdToken(idToken)
			return Promise.resolve({
				id: decodedToken.uid,
				name: "(get the name)",
			})
			// const name = userService.getUserById(decodedToken.uid) etc...
		} catch (error) {
			return Promise.reject(
				new AuthorizationError("The authentication header is invalid")
			)
		}
	} else {
		return Promise.reject(new Error("The security name is invalid"))
	}
}
