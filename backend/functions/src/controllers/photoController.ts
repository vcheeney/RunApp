import {
	Controller,
	Delete,
	Get,
	OperationId,
	Path,
	Query,
	Route,
	Tags,
} from "@tsoa/runtime"
import { Security } from "tsoa"
import { convertPhotoToWebPhoto, Photo, WebPhoto } from "../core/photo"
import { PhotoService } from "../services/photoService"

@Tags("Photos")
@Route("/photos")
export class PhotoController extends Controller {
	private readonly photoService: PhotoService

	constructor() {
		super()
		this.photoService = new PhotoService()
	}

	/**
	 * Retrieves the photos for a given event, optionally filtered by albums and bib number
	 * @param eventId The event id
	 * @param page The page number
	 * @param albumsIds The albums ids
	 * @param bibNumber The bib number
	 * @returns The requested photos
	 */
	@Get()
	@OperationId("findEventPhotos")
	async findMany(
		@Query() eventId: string,
		@Query() albumsIdsString?: string,
		@Query() lastPagePhotoId?: string,
		@Query() bibNumber?: string
	): Promise<Array<WebPhoto>> {
		const albumsIds =
			(albumsIdsString &&
				albumsIdsString != "" &&
				albumsIdsString?.split(",")) ||
			[]
		const photos = await this.photoService.findMany(
			eventId,
			albumsIds,
			lastPagePhotoId,
			bibNumber
		)
		return photos.map(convertPhotoToWebPhoto)
	}

	/**
	 * Retrieves the photo for the given id
	 * @param photoId The id of the photo
	 * @returns The requested photo
	 */
	@Get("{photoId}")
	@OperationId("findPhoto")
	async findById(@Path() photoId: string): Promise<Photo> {
		return this.photoService.findById(photoId)
	}

	/**
	 * Deletes the photo for the given id
	 * @param photoId The id of the photo
	 */
	@Delete("{photoId}")
	@Security("firebase")
	@OperationId("deletePhoto")
	async delete(@Path() photoId: string): Promise<boolean> {
		return this.photoService.delete(photoId)
	}
}
