class StorageHelper {
	public static getFilePurpose(path: string): FilePurpose {
		const pathElements = path.split("/")

		if (this.isPhotoPath(pathElements)) {
			return "PHOTO"
		} else if (this.isOrganizationLogoPath(pathElements)) {
			return "LOGO"
		} else if (this.isOrganizationBannerPath(pathElements)) {
			return "BANNER"
		} else if (this.isEventLogoPath(pathElements)) {
			return "LOGO"
		}

		return "UNKNOWN"
	}

	public static isPhotoPath(pathElements: Array<string>): boolean {
		// Example path: organizations/{orgId}/events/{eventId}/albums/{albumId}/{photo.jpeg}
		if (pathElements.length !== 7) {
			return false
		}
		return (
			pathElements[0] === "organizations" &&
			pathElements[2] === "events" &&
			pathElements[4] === "albums"
		)
	}

	public static isOrganizationBannerPath(pathElements: Array<string>): boolean {
		// Example path: organizations/${orgId}/banner
		if (pathElements.length !== 3) {
			return false
		}
		return pathElements[0] === "organizations" && pathElements[2] === "banner"
	}

	public static isOrganizationLogoPath(pathElements: Array<string>): boolean {
		// Example path: organizations/${orgId}/logo
		if (pathElements.length !== 3) {
			return false
		}
		return pathElements[0] === "organizations" && pathElements[2] === "logo"
	}

	public static isEventLogoPath(pathElements: Array<string>): boolean {
		// Example path: organizations/${orgId}/events/${eventId}/logo
		if (pathElements.length !== 5) {
			return false
		}
		return (
			pathElements[0] === "organizations" &&
			pathElements[2] === "events" &&
			pathElements[4] === "logo"
		)
	}

	public static getOrgId(path: string): string {
		const pathElements = path.split("/")
		return pathElements[1]
	}

	public static getEventId(path: string): string {
		const pathElements = path.split("/")
		return pathElements[3]
	}

	public static getAlbumId(path: string): string {
		const pathElements = path.split("/")
		return pathElements[5]
	}

	public static getPhotoName(path: string): string {
		const pathElements = path.split("/")
		return pathElements[6]
	}
}

export type FilePurpose = "PHOTO" | "LOGO" | "BANNER" | "UNKNOWN"

export default StorageHelper
