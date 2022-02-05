// Cloud functions entry file
import * as admin from "firebase-admin"

// Firebase app initialization
admin.initializeApp({
	projectId: "firebaseprojectid",
})

// Main API function used to make backend calls from the frontend
export { api } from "./api"
// Function triggered whenever a photo is uploaded
export { onFileUploaded } from "./onFileUploaded"

// Function triggered whenever a photo is deleted
export { onFileDeleted } from "./onFileDeleted"

// Function triggered whenever a photo document is created
export { bibRecognition } from "./bibRecognition"

// Util developer functions
export { resetPhotoCount } from "./dev"
