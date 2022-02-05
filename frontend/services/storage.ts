import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
} from 'firebase/storage'
import { extractPathStorageFromDlUrl } from '../utils/utils'
const storage = getStorage()

export async function uploadPhoto(
  file: File,
  orgId: string,
  eventId: string,
  albumId: string,
  photoId = new Date().getTime().toString()
) {
  const path = photoPath(orgId, eventId, albumId, photoId)
  await uploadToStorage(file, path)
}

export async function uploadToStorage(
  file: File,
  path: string
): Promise<string> {
  const storageRef = ref(storage, path)
  const snapshot = await uploadBytes(storageRef, file)
  return getDownloadURL(storageRef)
}

function photoPath(
  orgId: string,
  eventId: string,
  albumId: string,
  photoName: string
) {
  return `organizations/${orgId}/events/${eventId}/albums/${albumId}/${photoName}`
}
export async function uploadBlobUrlToStorageAndGetDLUrl(
  blobUrl: string,
  path: string
) {
  const blob = await fetch(blobUrl).then((r) => r.blob())
  const storageRef = ref(storage, path)
  const snapshot = await uploadBytes(storageRef, blob)

  return await getDownloadURL(snapshot.ref)
}

export async function removeByDlUrlPath(dlUrl: string) {
  try {
    const storagePath = extractPathStorageFromDlUrl(dlUrl)
    const storageRef = ref(storage, storagePath)
    await deleteObject(storageRef)
  } catch (e) {
    console.log(e)
  }
}
