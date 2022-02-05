import * as functions from "firebase-functions"
import { isEmulator } from "./config/env"
import { AlbumService } from "./services/albumService"
import { EventService } from "./services/eventService"
import { OrganizationService } from "./services/organizationService"

export const resetPhotoCount = functions.https.onRequest(async (req, res) => {
	if (isEmulator()) {
		const organizationService = new OrganizationService()
		const eventService = new EventService()
		const albumService = new AlbumService()
		await organizationService.resetPhotoCountForEachOrganization()
		await eventService.resetPhotoCountForEachEvent()
		await albumService.resetPhotoCountForEachAlbum()
		res.status(200).send("Reset photo count")
	} else {
		res.status(500).send("Not allowed")
	}
})
