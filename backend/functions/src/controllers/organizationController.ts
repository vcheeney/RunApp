import {
	Body,
	Controller,
	Get,
	Path,
	Post,
	Query,
	Route,
	Security,
	Request,
	Tags,
	OperationId,
	Put,
} from "tsoa"
import {
	CreateOrganizationDto,
	Organization,
	UpdateOrganizationDto,
} from "../core/organization"
import { AuthorizationError } from "../core/utils"
import { AuthenticatedRequest } from "../middleware/authentication"
import {
	ensureUserIsOrganizationAdmin,
	OrganizationService,
} from "../services/organizationService"

@Tags("Organizations")
@Route("/organizations")
export class OrganizationController extends Controller {
	private readonly organizationService: OrganizationService

	constructor() {
		super()
		this.organizationService = new OrganizationService()
	}

	/**
	 * Creates a new organization with the passed information
	 * @param createOrganizationDto The new organization data
	 * @returns The newly created organization
	 */
	@Post()
	@Security("firebase")
	@OperationId("createOrganization")
	async create(
		@Request() request: AuthenticatedRequest,
		@Body() createOrganizationDto: CreateOrganizationDto
	): Promise<Organization> {
		return this.organizationService.create(createOrganizationDto, request.user)
	}

	@Put()
	@Security("firebase")
	@OperationId("updateOrganization")
	async update(
		@Request() request: AuthenticatedRequest,
		@Query() orgUri: string,
		@Body() updateOrganizationDto: UpdateOrganizationDto
	): Promise<Organization> {
		const user = request.user
		const org = await this.organizationService.findByUri(orgUri)
		ensureUserIsOrganizationAdmin(org, user.id)

		return this.organizationService.update(org.id, updateOrganizationDto)
	}

	/**
	 * Retrieves the organizations of a specific user
	 * @param userId The user id for which you want to retrieve the organizations
	 * @returns The organizations of the specified user
	 */
	@Get()
	@Security("firebase")
	@OperationId("findUserOrganizations")
	async findAllForUser(
		@Request() request: AuthenticatedRequest,
		@Query() userId: string
	): Promise<Array<Organization>> {
		if (request.user.id !== userId)
			throw new AuthorizationError(
				"Vous n'êtes pas autorisé à consulter les organisations d'un autre utilisateur"
			)
		return this.organizationService.findAllForUser(userId)
	}

	/**
	 * Retrieves the organization with the specified uri
	 * @param orgUri The uri of the desired organization
	 * @returns The organization with the specified uri
	 */
	@Get("{orgUri}")
	@OperationId("findOrganizationByUri")
	async findByUri(@Path() orgUri: string): Promise<Organization> {
		return this.organizationService.findByUri(orgUri)
	}
}
