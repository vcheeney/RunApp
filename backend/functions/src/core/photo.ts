// Constants
export const PAGE_SIZE = 20

// Data structures
export type Photo = {
	id: string
	organizationId: string
	eventId: string
	albumId: string
	/**
	 * Une liste des BIBs associés à la photo
	 * @example ["83", "57", "12"]
	 */
	bibNumbers: Array<string>
	/**
	 * Valeur booléenne indiquant si les numéros de bibs ont été extraits de la photo
	 */
	haveBibsBeenChecked: boolean
	/**
	 * Date à laquelle la photo a été analysée
	 */
	analysisDate?: Date
	/**
	 * L'URL de téléchargement de la photo originale
	 * @example "https://www.runapp.com/organizations/bd721f18/events/d03605e6/albums/dbecd248/e50baa5c/original.jpg"
	 */
	sourceImageUrl: string
	/**
	 * L'URL de téléchargement de la photo telle qu'affichée sur le site
	 * @example "https://www.runapp.com/organizations/bd721f18/events/d03605e6/albums/dbecd248/e50baa5c/preview.jpg"
	 */
	previewImageUrl: string
	price: 0
	width: number
	height: number
	portrait: boolean
	name: string
}

export type CreatePhotoDto = Omit<Photo, "id">

/**
 * Le type de photo qui sera retourné à l'interface web
 */
export type WebPhoto = Omit<Photo, "sourceImageUrl">

// Functions
export function convertPhotoToWebPhoto(photo: Photo): WebPhoto {
	return {
		id: photo.id,
		organizationId: photo.organizationId,
		eventId: photo.eventId,
		albumId: photo.albumId,
		bibNumbers: photo.bibNumbers,
		haveBibsBeenChecked: !!photo.haveBibsBeenChecked,
		previewImageUrl: photo.previewImageUrl,
		price: photo.price,
		width: photo.width,
		height: photo.height,
		portrait: photo.portrait,
		name: photo.name,
	}
}
