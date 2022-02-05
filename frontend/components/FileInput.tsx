import { DocumentAddIcon, XIcon } from '@heroicons/react/solid'
import { FieldHookConfig, useField } from 'formik'
import React, { FC, useRef } from 'react'
import { createPhotoPreview, FileWithPreview } from '../utils/files'
import Button from './Button'

type Props = FieldHookConfig<FileWithPreview | null | string> & {
  label: string
}

const FileInput: FC<Props> = ({ label, ...props }) => {
  const hiddenFileInput = useRef<HTMLInputElement | null>(null)
  const [field, meta, helpers] = useField<FileWithPreview | null | string>(
    props
  )

  const handleInput = async (event: any) => {
    const file = event.currentTarget.files![0]
    if (file) {
      const fileWithPreview = await createPhotoPreview(file)
      helpers.setValue(fileWithPreview)
    }
  }

  return (
    <div>
      <input
        className="hidden"
        type="file"
        ref={hiddenFileInput}
        onChange={handleInput}
      />
      <label className="text-sm font-medium text-gray-400 uppercase">
        {label}
      </label>
      <div className="flex items-center space-x-2">
        <Button
          onClick={() => hiddenFileInput.current!.click()}
          text="Select file"
          Icon={DocumentAddIcon}
          type="button"
        />
        {field.value && (
          <p className="text-gray-500">
            {typeof field.value !== 'string'
              ? field.value.name
              : 'Current file'}
          </p>
        )}
        {field.value && (
          <button
            className="text-gray-800"
            type="button"
            onClick={() => helpers.setValue('')}
          >
            <XIcon className="w-4 h-4" />
          </button>
        )}
      </div>
      {meta.error ? (
        <p className="text-sm font-medium tracking-wide text-red-600">
          {meta.error}
        </p>
      ) : null}
    </div>
  )
}

export default FileInput
