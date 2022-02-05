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
import { CreateEventDto, RacingEvent, UpdateEventDto } from "../core/event"
import { AuthenticatedRequest } from "../middleware/authentication"
import { EventService } from "../services/eventService"
import {
	ensureUserIsOrganizationAdmin,
	OrganizationService,
} from "../services/organizationService"

@Tags("Events")
@Route("/events")
export class EventController extends Controller {
	private readonly eventService: EventService
	private readonly organizationService: OrganizationService

	constructor() {
		super()
		this.eventService = new EventService()
		this.organizationService = new OrganizationService()
	}

	/**
	 * Creates a new event for the given organization
	 * @param request The authenticated request
	 * @param orgUri The organization URI
	 * @param createEventDto The event to create
	 * @returns The newly created event
	 */
	@Post()
	@Security("firebase")
	@OperationId("createEvent")
	async create(
		@Request() request: AuthenticatedRequest,
		@Query() orgUri: string,
		@Body() createEventDto: CreateEventDto
	): Promise<RacingEvent> {
		const user = request.user
		const org = await this.organizationService.findByUri(orgUri)
		ensureUserIsOrganizationAdmin(org, user.id)
		return this.eventService.create(org.id, createEventDto)
	}

	@Put()
	@Security("firebase")
	@OperationId("updateEvent")
	async update(
		@Request() request: AuthenticatedRequest,
		@Query() orgUri: string,
		@Body() updateEventDto: UpdateEventDto
	): Promise<RacingEvent> {
		const user = request.user
		const org = await this.organizationService.findByUri(orgUri)
		ensureUserIsOrganizationAdmin(org, user.id)
		
		return this.eventService.update(org.id, updateEventDto)
	}

	/**
	 * Retrieves all events for the given organization
	 * @param orgUri The organization uri
	 * @returns The events for the given organization
	 */
	@Get()
	@OperationId("findOrganizationsEvents")
	async findOrganizationEvents(
		@Query() orgUri: string
	): Promise<Array<RacingEvent>> {
		const org = await this.organizationService.findByUri(orgUri)
		return this.eventService.findAllForOrg(org.id)
	}

	/**
	 * Retrieves the event for the given organization and event uri
	 * @param orgUri The organization uri
	 * @param eventUri The event uri
	 * @returns The requested event
	 */
	@Get("{eventUri}")
	@OperationId("findEventByUri")
	async findByUri(
		@Query() orgUri: string,
		@Path() eventUri: string
	): Promise<RacingEvent> {
		const org = await this.organizationService.findByUri(orgUri)
		return this.eventService.findByUri(org.id, eventUri)
	}
}
