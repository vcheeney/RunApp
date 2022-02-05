import React, { FC } from 'react'
import ActionStepIndicator from './ActionStepIndicator'
import Button from './Button'
import Modal from './Modal'

type Props = {
  type?: 'creation' | 'modification'
  showModal: boolean

  uploadProgress: number
  albumModified: boolean
  allFilesUploaded: boolean
  processingComplete: boolean
  processingError: string

  onClickViewAlbum: () => void
}

const AlbumCreationModal: FC<Props> = ({
  type = 'creation',
  showModal,
  uploadProgress,
  albumModified,
  allFilesUploaded,
  processingComplete,
  processingError,
  onClickViewAlbum,
}) => {
  return (
    <Modal isOpen={showModal} onClose={() => {}}>
      <div>
        <div className="my-8">
          <ActionStepIndicator
            done={albumModified}
            text={type == 'creation' ? 'Album creation' : 'Album update'}
          />
          <ActionStepIndicator
            done={albumModified}
            text="Preparing destination directory"
          />
          <ActionStepIndicator
            done={allFilesUploaded}
            text={`Uploading pictures (${formatNumberToPercentage(
              uploadProgress
            )})`}
          />
          <ActionStepIndicator
            done={processingComplete}
            text={`Processing completion`}
            error={processingError}
          />
        </div>
        <div>
          <Button
            variant="primary"
            size="large"
            text="View the album"
            disabled={!processingComplete}
            onClick={onClickViewAlbum}
          />
        </div>
      </div>
    </Modal>
  )
}

export default AlbumCreationModal

function formatNumberToPercentage(number: number) {
  return `${Math.round(number * 100)}%`
}
