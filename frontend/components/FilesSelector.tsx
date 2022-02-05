import { XIcon } from '@heroicons/react/solid'
import { FieldHookConfig, useField } from 'formik'
import React, { FC } from 'react'
import { useDropzone } from 'react-dropzone'
import { createPhotoPreview, FileWithPreview } from '../utils/files'
import { WebPhoto } from '../services/api'
import Button from './Button'
import PhotoGalleryView from './PhotoGalleryView'

type Props = FieldHookConfig<string> & {
  icon?: JSX.Element
  label?: string
}

export type PhotoSelection = {
  files: File[]
  webPhotos: WebPhoto[]
}

type PhotoSelectionWithPreview = {
  files: FileWithPreview[]
  webPhotos: WebPhoto[]
}

const FilesSelector: FC<Props> = ({ icon, label, ...props }) => {
  const [{ value }, { error: errorObject, touched }, { setValue }] =
    useField<PhotoSelectionWithPreview>(props as any)

  const error = (errorObject as { files: string } | undefined)?.files

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      Promise.all(acceptedFiles.map(createPhotoPreview))
        .then((filesWithPreviews) => {
          const addedFiles = filesWithPreviews.filter(
            (file) => !value.files.find((f) => f.name === file.name)
          )
          setValue({
            ...value,
            files: value.files.concat(addedFiles),
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
  })

  const nbrSelectedPhotos =
    value.files?.length ?? 0 + value.webPhotos?.length ?? 0

  return (
    <div className="px-8 pb-8">
      <div className="flex items-center justify-between py-4 mb-2">
        <div>
          <p className="text-xl md:text-2xl">
            {nbrSelectedPhotos > 0
              ? `${nbrSelectedPhotos} photos selected`
              : 'No photos selected'}
          </p>
        </div>
        <Button text="Add photos" onClick={open} />
      </div>
      <hr />
      {touched && error && (
        <p className="text-sm font-medium tracking-wide text-red-600">
          {error}
        </p>
      )}
      <div className="flex justify-center py-8">
        <div className="p-6 bg-white shadow-xl rounded-3xl">
          <div
            {...getRootProps({ className: 'dropzone' })}
            className="flex items-center justify-center h-32 border-8 border-gray-200 border-dashed cursor-pointer rounded-2xl w-96"
          >
            <input {...getInputProps()} />
            <p className="font-medium text-gray-400">
              Drag your images here, or{' '}
              <span className="text-primary-500">search</span>
            </p>
          </div>
        </div>
      </div>
      <PhotoGalleryView
        preview={false}
        photos={value.files
          .map((file) =>
            createGalleryPhoto(file.name, file.preview, file.portrait, () =>
              setValue({
                ...value,
                files: value.files.filter((f) => f !== file),
              })
            )
          )
          .concat(
            value.webPhotos.map((webPhoto) =>
              createGalleryPhoto(
                webPhoto.id,
                webPhoto.previewImageUrl,
                webPhoto.portrait,
                () =>
                  setValue({
                    ...value,
                    webPhotos: value.webPhotos.filter((p) => p !== webPhoto),
                  })
              )
            )
          )}
      />
    </div>
  )
}

function createGalleryPhoto(
  name: string,
  url: string,
  portrait: boolean,
  onClickX: () => void
) {
  return (
    <div
      key={name}
      className={`relative flex justify-center items-center overflow-hidden group select-none shadow ${
        portrait ? 'row-span-2' : ''
      }`}
    >
      <img
        src={url}
        alt={name}
        className="object-cover min-w-full min-h-full rounded shadow"
      />
      <div className="absolute inset-0 flex flex-col">
        <div className="flex-grow transition-all duration-300 rounded rounded-b opacity-0 bg-gradient-to-t from-black/50 to-black/30 group-hover:opacity-100"></div>
      </div>
      <div className="absolute top-0 left-0 z-10 hidden p-4 space-x-4 text-white group-hover:flex">
        <XIcon
          className="w-6 h-6 cursor-pointer hover:text-gray-200 active:text-gray-400"
          onClick={onClickX}
        />
      </div>
    </div>
  )
}

export default FilesSelector
