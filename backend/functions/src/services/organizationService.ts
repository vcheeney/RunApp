import { firestore } from "firebase-admin"
import {
	createOrganization,
	CreateOrganizationDto,
	Organization,
	UpdateOrganizationDto,
} from "../core/organization"
import { User } from "../core/user"
import {
	AuthorizationError,
	Collection,
	CustomValidateError,
	NoRecordFoundError,
} from "../core/utils"
const db = firestore()

export class OrganizationService {
	async create(
		dto: CreateOrganizationDto,
		user: User,
		date = new Date()
	): Promise<Organization> {
		const org = createOrganization(dto, user, date)

		const alreadyExists = await this.exists(dto.uri)

		if (alreadyExists) {
			throw new CustomValidateError<CreateOrganizationDto>({
				uri: {
					message: "This URI is already taken",
					value: org.uri,
				},
			})
		}

		try {
			const docRef = await db.collection(Collection.ORGANIZATIONS).add(org)
			const newOrg: Organization = {
				...org,
				id: docRef.id,
			}

			return newOrg
		} catch (e) {
			throw new CustomValidateError<CreateOrganizationDto>({
				name: {
					message: "An error occurred while saving the organization",
				},
			})
		}
	}

	async update(
		orgId: string,
		updateOrganizationDto: UpdateOrganizationDto
	): Promise<Organization> {
		try {
			const docRef = await db
				.collection(Collection.ORGANIZATIONS)
				.doc(orgId)
				.get()

			await docRef.ref.update(updateOrganizationDto)

			return await this.findById(orgId)
		} catch (error) {
			console.log(error)
			throw new CustomValidateError<UpdateOrganizationDto>({
				name: {
					message: "An error occurred while updating the organization",
				},
			})
		}
	}

	async findAllForUser(userId: string): Promise<Array<Organization>> {
		const orgsRef = db
			.collection(Collection.ORGANIZATIONS)
			.where("membersIds", "array-contains", userId)
		const querySnapshot = await orgsRef.get()

		const organizations = querySnapshot.docs.map((doc) => {
			return {
				id: doc.id,
				...doc.data(),
			} as Organization
		})

		return organizations
	}

	async findById(id: string): Promise<Organization> {
		const orgsRef = db.collection(Collection.ORGANIZATIONS).doc(id)
		const doc = await orgsRef.get()

		if (!doc.exists) {
			throw new NoRecordFoundError("No organization found with this ID")
		}

		return {
			...doc.data(),
			id: doc.id,
		} as Organization
	}

	async findByUri(uri: string): Promise<Organization> {
		const orgsRef = db
			.collection(Collection.ORGANIZATIONS)
			.where("uri", "==", uri)
		const querySnapshot = await orgsRef.get()

		if (querySnapshot.empty) {
			throw new NoRecordFoundError("No organization found with this URI")
		}
		if (querySnapshot.docs.length > 1) {
			throw new Error("Multiple organizations found with this URI")
		}

		const docs = querySnapshot.docs.map((doc) => {
			return {
				...doc.data(),
				id: doc.id,
			} as Organization
		})

		return docs[0]
	}

	async exists(uri: string): Promise<boolean> {
		try {
			await this.findByUri(uri)
			return true
		} catch (error) {
			if (error instanceof NoRecordFoundError) {
				return false
			}
			return true
		}
	}

	async incrementPhotoCount(id: string): Promise<void> {
		return this.incrementPhotoCountByValue(id, 1)
	}

	async decrementPhotoCount(id: string): Promise<void> {
		return this.incrementPhotoCountByValue(id, -1)
	}

	async incrementPhotoCountByValue(id: string, value: number): Promise<void> {
		const orgRef = db.collection(Collection.ORGANIZATIONS).doc(id)
		await orgRef.update({
			photoCount: firestore.FieldValue.increment(value),
		})
	}

	async resetPhotoCountForEachOrganization(): Promise<void> {
		const orgsRef = db.collection(Collection.ORGANIZATIONS)
		const querySnapshot = await orgsRef.get()

		const batch = db.batch()
		querySnapshot.docs.forEach((doc) => {
			batch.update(doc.ref, {
				photoCount: 0,
			})
		})

		await batch.commit()
	}
}

export function ensureUserIsOrganizationAdmin(
	org: Organization,
	userId: string,
	message = "You are not authorized to perform this action"
): void {
	if (org.membersIds.indexOf(userId) === -1) {
		throw new AuthorizationError(message)
	}
}
