import * as functions from "firebase-functions"
// import vision from "@google-cloud/vision"
import { PhotoService } from "./services/photoService"

// const client = new vision.ImageAnnotatorClient()

export const bibRecognition = functions.firestore
	.document("PHOTOS/{photoId}")
	.onCreate(async (snapshot) => {
		console.log("Get the BIBs using a computer vision API")
		// const document = snapshot.data()
		// const url = document.sourceImageUrl
		// const [response] = await client.textDetection(url)
		// const annotations = response.textAnnotations
		// if (annotations && annotations.length) {
		// 	const text = annotations[0].description
		const bibs: string[] = []
		// 	const lines = text!.split("\n")
		// 	for (const line in lines) {
		// 		if (typeof parseInt(line) === "number") {
		// 			bibs.push(line)
		// 		}
		// 	}
		const photoService = new PhotoService()
		photoService.updateBibs(snapshot.id, bibs, new Date())
		// }
	})
