import { CogIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import React, { FC, MutableRefObject, useState } from 'react'
import { WebPhoto } from '../services/api'
import DownloadButton from './DownloadButton'
import PhotoDialog from './PhotoDialog'
import PhotoGalleryView from './PhotoGalleryView'
import Tooltip from './Tooltip'

type Props = {
  photos: WebPhoto[]
  preview: boolean
  containerRef: MutableRefObject<null>
}

const PhotoGallery: FC<Props> = ({ photos, preview, containerRef }) => {
  const photoRefs: HTMLDivElement[] = []

  const router = useRouter()
  const { organizationUri, eventUri, photo: photoId } = router.query
  const photoIndex = photos.findIndex((p) => p.id == photoId)
  const photo = photos[photoIndex]

  const [currentPhoto, setCurrentPhoto] = useState(photo ?? photos[0])

  const hasNextPhoto = () => photoIndex < photos.length - 1
  const hasPreviousPhoto = () => photoIndex > 0

  function openPhoto(photo: WebPhoto) {
    if (preview) return
    setCurrentPhoto(photo)
    router.push(
      `/${organizationUri}/${eventUri}?photo=${photo.id}`,
      undefined,
      {
        scroll: false,
        shallow: true,
      }
    )
  }

  function onClosePhoto() {
    router.push(`/${organizationUri}/${eventUri}`, undefined, {
      scroll: false,
      shallow: true,
    })

    photoRefs[photoIndex].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    })
  }

  function onNextPhoto() {
    if (hasNextPhoto()) {
      openPhoto(photos[photoIndex + 1])
    }
  }

  function onPreviousPhoto() {
    if (hasPreviousPhoto()) openPhoto(photos[photoIndex - 1])
  }

  return (
    <>
      <PhotoDialog
        photo={currentPhoto}
        isOpen={photo != undefined}
        onClose={onClosePhoto}
        hasPrevious={hasPreviousPhoto()}
        hasNext={hasNextPhoto()}
        onPrevious={onPreviousPhoto}
        onNext={onNextPhoto}
      />
      <PhotoGalleryView
        photos={photos.map((photo) => (
          <div
            ref={(ref) => photoRefs.push(ref as HTMLDivElement)}
            key={photo.id}
            className={`relative flex justify-center items-center overflow-hidden group select-none shadow ${
              photo.portrait ? 'row-span-2' : ''
            } ${preview ? '' : 'cursor-pointer'}`}
          >
            <img
              src={`${photo.previewImageUrl}`}
              alt={photo.id}
              className="object-cover min-w-full min-h-full shadow sm:rounded"
            />
            <div
              className="absolute inset-0 flex flex-col"
              onClick={() => openPhoto(photo)}
            >
              <div
                className={`flex-grow transition-all duration-300 rounded-b opacity-0 bg-gradient-to-t from-black/50 to-transparent ${
                  preview ? '' : 'group-hover:opacity-100'
                }`}
              ></div>
            </div>

            {!photo.haveBibsBeenChecked && (
              <div className="absolute top-0 left-0 z-0 m-4 space-x-4 text-white">
                <Tooltip
                  label="Extraction des numéros de dossard en cours..."
                  boundaryContainer={containerRef.current}
                >
                  <CogIcon className="z-10 w-6 h-6 duration-75 cursor-pointer animate-spin-slow" />
                </Tooltip>
              </div>
            )}
            <div
              className={`absolute bottom-0 right-0 z-0 hidden m-4 space-x-4 text-white ${
                preview ? '' : 'group-hover:flex'
              }`}
            >
              {/* Non inclus dans la V1 */}
              {/* <HeartIcon className="w-6 h-6 cursor-pointer hover:text-gray-200 active:text-gray-400" /> */}
              {/* <ShoppingCartIcon className="w-6 h-6 cursor-pointer hover:text-gray-200 active:text-gray-400" /> */}
              <DownloadButton
                url={photo.previewImageUrl}
                className="text-gray-200 hover:text-gray-400 active:text-gray-400"
              />
            </div>
          </div>
        ))}
        preview={preview}
      />
    </>
  )
}

export default PhotoGallery
