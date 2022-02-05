import {
	Body,
	Controller,
	Get,
	Route,
	Request,
	Post,
	Security,
	Query,
	Path,
	Tags,
	OperationId,
	Put,
} from "@tsoa/runtime"
import { EventService } from "../services/eventService"
import {
	ensureUserIsOrganizationAdmin,
	OrganizationService,
} from "../services/organizationService"
import { AlbumService } from "../services/albumService"
import { AuthenticatedRequest } from "../middleware/authentication"
import { Album, CreateAlbumDto, UpdateAlbumDto } from "../core/album"

@Tags("Albums")
@Route("/albums")
export class AlbumController extends Controller {
	private readonly organizationService: OrganizationService
	private readonly eventService: EventService
	private readonly albumService: AlbumService

	constructor() {
		super()
		this.organizationService = new OrganizationService()
		this.eventService = new EventService()
		this.albumService = new AlbumService()
	}

	/**
	 * Creates a new album for the given event in the given organization
	 * @param request The authenticated request
	 * @param orgUri The organization URI
	 * @param eventUri The event URI
	 * @param createAlbumDto The album to create
	 * @returns The newly created album
	 */
	@Post()
	@Security("firebase")
	@OperationId("createAlbum")
	async create(
		@Request() request: AuthenticatedRequest,
		@Query() orgUri: string,
		@Query() eventUri: string,
		@Body() createAlbumDto: CreateAlbumDto
	): Promise<Album> {
		const user = request.user
		const org = await this.organizationService.findByUri(orgUri)
		ensureUserIsOrganizationAdmin(org, user.id)
		const event = await this.eventService.findByUri(org.id, eventUri)
		return this.albumService.create(org.id, event.id, createAlbumDto)
	}

	/**
	 * Modifies an album for the given event in the given organization
	 * @param request The authenticated request
	 * @param orgUri The organization URI
	 * @param eventUri The event URI
	 * @param albumUri The event URI
	 * @param createAlbumDto The album to create
	 * @returns The newly updated album
	 */
	@Put()
	@Security("firebase")
	@OperationId("modifyAlbum")
	async modify(
		@Request() request: AuthenticatedRequest,
		@Query() orgUri: string,
		@Query() eventUri: string,
		@Query() albumUri: string,
		@Body() updateAlbumDto: UpdateAlbumDto
	): Promise<Album> {
		const user = request.user
		const org = await this.organizationService.findByUri(orgUri)
		ensureUserIsOrganizationAdmin(org, user.id)
		const event = await this.eventService.findByUri(org.id, eventUri)
		return this.albumService.update(org.id, event.id, albumUri, updateAlbumDto)
	}

	/**
	 * Retrieves all albums for the given event in the given organization
	 * @param orgUri The organization URI
	 * @param eventUri The event URI
	 * @returns The albums for the given event in the given organization
	 */
	@Get()
	@OperationId("findEventAlbums")
	async findEventAlbums(
		@Query() orgUri: string,
		@Query() eventUri: string
	): Promise<Album[]> {
		const org = await this.organizationService.findByUri(orgUri)
		const event = await this.eventService.findByUri(org.id, eventUri)
		return this.albumService.findAllForEvent(org.id, event.id)
	}

	/**
	 * Retrieves the album for the given organization, event, and album URI
	 * @param orgUri The organization URI
	 * @param eventUri The event URI
	 * @param albumUri The album URI
	 * @returns The requested album
	 */
	@Get("{albumUri}")
	@OperationId("findAlbumByUri")
	async findByUri(
		@Query() orgUri: string,
		@Query() eventUri: string,
		@Path() albumUri: string
	): Promise<Album> {
		const org = await this.organizationService.findByUri(orgUri)
		const event = await this.eventService.findByUri(org.id, eventUri)
		return this.albumService.findByUri(org.id, event.id, albumUri)
	}
}
