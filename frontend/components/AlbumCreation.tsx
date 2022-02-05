import router from 'next/dist/client/router'
import React, { FC, useRef, useState } from 'react'
import {
  ALBUM_REFETCH_DELAY_MS,
  ALBUM_REFETCH_EXTENDED_DELAY_MS,
  ALBUM_REFETCH_MAX_TIMEPERIOD_MS,
} from '../config/constants'
import { albumsApi, photosApi, WebPhoto } from '../services/api'
import {
  useAlbum,
  useEvent,
  useOrganization,
  usePhotos,
} from '../services/api/queries'
import { uploadPhoto } from '../services/storage'
import AlbumCreationModal from './AlbumCreationModal'
import AlbumForm from './AlbumForm'
import FullPageSpinnerWithLayout from './FullPageSpinnerWithLayout'
import NoContentWithLayout from './NoContentWithLayout'

type Props = {
  type?: 'creation' | 'modification'

  orgUri: string
  eventUri: string
  originalAlbumUri?: string
}

const AlbumCreation: FC<Props> = ({
  type = 'creation',
  orgUri,
  eventUri,
  originalAlbumUri = '',
}) => {
  // 1. Show the modal and create the album in Firestore
  const [showModal, setShowModal] = useState(false)
  const [albumCreated, setAlbumCreated] = useState(false)

  // 2. Upload the photos to Firebase Storage
  const [nbrFilesToBeProcessed, setNbrFilesToBeProcessed] = useState(0)
  const [nbrPhotosInAlbum, setNbrPhotosInAlbum] = useState(0)
  const [nbrProcessedFiles, setNbrProcessedFiles] = useState(0)
  const allFilesUploaded = nbrProcessedFiles === nbrFilesToBeProcessed

  // 3. Wait for the photos documents to have been added to Firestore by polling the album document and checking its photo count field
  const [albumUri, setAlbumUri] = useState(originalAlbumUri)
  const [finalizingTreatment, setFinalizingTreatment] = useState(false)
  const albumIdRef = useRef<string | null>(null)
  const lastTimeAmountPhotosIncreasedRef = useRef(new Date())
  const isFirstFetchRef = useRef(true)
  const [processingComplete, setProcessingComplete] = useState(false)
  const [processingError, setProcessingError] = useState('')

  const { data: org, status: orgStatus } = useOrganization(orgUri)
  const { data: event, status: eventStatus } = useEvent(orgUri, eventUri)
  const { data: album, status: albumStatus } = useAlbum(
    orgUri,
    eventUri,
    albumUri,
    {
      refetchInterval: (fetchedAlbum, query) => {
        if (fetchedAlbum && finalizingTreatment) {
          const photoCount = fetchedAlbum.photoCount
          const previousPhotoCount =
            query.revertState && query.revertState.data
              ? query.revertState.data.photoCount
              : photoCount
          const now = new Date()
          const date10secondsAgo = new Date(
            now.getTime() - ALBUM_REFETCH_MAX_TIMEPERIOD_MS
          )

          // If it's the first fetch, init the last time amount photos increased date
          if (isFirstFetchRef.current) {
            isFirstFetchRef.current = false
            lastTimeAmountPhotosIncreasedRef.current = new Date()
            return ALBUM_REFETCH_DELAY_MS
          }

          // If the album photo count equals the amount of photos uploaded, all have been properly processed by the cloud function
          if (fetchedAlbum.photoCount === nbrPhotosInAlbum) {
            setProcessingComplete(true)
            return false
          }

          // If the amount of photos increased, update the last time amount photos increased and refetch in ALBUM_REFETCH_DELAY_MS
          if (photoCount != previousPhotoCount) {
            lastTimeAmountPhotosIncreasedRef.current = new Date()
            return ALBUM_REFETCH_DELAY_MS
          }

          // If the amount of photos has not changed but it has not been ALBUM_REFETCH_MAX_TIMEPERIOD_MS yet, refetch in ALBUM_REFETCH_EXTENDED_DELAY_MS
          if (lastTimeAmountPhotosIncreasedRef.current > date10secondsAgo) {
            return ALBUM_REFETCH_EXTENDED_DELAY_MS
          }

          // In any other case, we don't need to refetch
          setProcessingComplete(true)

          setProcessingError(
            'An error occurred while processing your photos. You can still try to check the album.'
          )
          return false
        }
        return false
      },
    }
  )

  let photos: WebPhoto[]
  let photosStatus: string

  const res = usePhotos({
    eventId: event?.id as string,
    bibNumber: '',
    albumsIds: album ? [album.id] : [],
  })

  if (type !== 'modification') {
    photos = []
    photosStatus = 'succeeded'
  } else {
    photos = res.data as WebPhoto[]
    photosStatus = res.status
  }

  if (
    orgStatus === 'loading' ||
    eventStatus === 'loading' ||
    (type == 'modification' && albumStatus === 'loading') ||
    (type == 'modification' && photosStatus === 'loading')
  ) {
    return <FullPageSpinnerWithLayout />
  }

  if (type == 'modification' && !album)
    return <NoContentWithLayout text="This album does not exist" />
  if (!event) return <NoContentWithLayout text="This event does not exist" />
  if (!org)
    return <NoContentWithLayout text="This organization does not exist" />

  function removedPhotos(submittedPhotos: WebPhoto[]): WebPhoto[] {
    return (
      photos?.filter(
        (photo) =>
          submittedPhotos.find(
            (submittedPhoto) => submittedPhoto.id == photo.id
          ) == undefined
      ) ?? []
    )
  }
  return (
    <>
      <AlbumForm
        title={type == 'creation' ? 'Create the album' : 'Update the album'}
        initialAlbumName={album?.name ?? ''}
        initialAlbumUri={album?.uri ?? ''}
        initialPhotos={photos}
        submitButtonText={
          type == 'creation' ? 'Create the album' : 'Update the album'
        }
        onSubmit={async (values, helpers) => {
          try {
            const { name, uri, photosSelection } = values

            if (type == 'creation' && photosSelection.files.length == 0) {
              helpers.setFieldError(
                'files',
                'No photos selected, please select at least one photo'
              )
              return
            }
            const {
              data: { organizationId, eventId, id: albumId, uri: newAlbumUri },
            } =
              type == 'creation'
                ? await albumsApi.createAlbum({
                    orgUri,
                    eventUri,
                    body: {
                      name,
                      uri,
                    },
                  })
                : await albumsApi.modifyAlbum({
                    orgUri,
                    eventUri,
                    albumUri,
                    body: {
                      name,
                      uri,
                    },
                  })

            // Fetch the ablum
            setAlbumUri(newAlbumUri)

            const photosToRemove = removedPhotos(photosSelection.webPhotos)

            albumIdRef.current = albumId
            setShowModal(true)
            setAlbumCreated(true)
            setNbrFilesToBeProcessed(
              photosSelection.files.length + photosToRemove.length
            )

            setNbrPhotosInAlbum(
              photosSelection.webPhotos.length + photosSelection.files.length
            )
            const promises = photosSelection.files
              .map((file) => async () => {
                await uploadPhoto(
                  file,
                  organizationId,
                  eventId,
                  albumId,
                  file.name
                )
                setNbrProcessedFiles((previous) => previous + 1)
              })
              .concat(
                photosToRemove.map((photoToRemove) => async () => {
                  await photosApi.deletePhoto({ photoId: photoToRemove.id })
                  setNbrProcessedFiles((previous) => previous + 1)
                })
              )

            for (const promise of promises) {
              await promise()
            }

            setFinalizingTreatment(true)
          } catch (error: any) {
            setShowModal(false)
            console.log(error)
            for (const key in error.response.data.details) {
              if (error.response.data.details.hasOwnProperty(key)) {
                const message = error.response.data.details[key].message
                const parsedKey = key.includes('.') ? key.split('.')[1] : key
                helpers.setFieldError(parsedKey, message)
              }
            }
          }
        }}
      ></AlbumForm>

      <AlbumCreationModal
        type={type}
        showModal={showModal}
        uploadProgress={
          nbrFilesToBeProcessed == 0
            ? 1
            : nbrProcessedFiles / nbrFilesToBeProcessed
        }
        albumModified={albumCreated}
        allFilesUploaded={allFilesUploaded}
        processingComplete={processingComplete}
        processingError={processingError}
        onClickViewAlbum={() => {
          router.replace(`/${orgUri}/${eventUri}?albumId=${albumIdRef.current}`)
        }}
      ></AlbumCreationModal>
    </>
  )
}

export default AlbumCreation
