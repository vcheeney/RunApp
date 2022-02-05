import { Dialog, Transition } from '@headlessui/react'
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/solid'
import React, { FC, Fragment } from 'react'
import { WebPhoto } from '../services/api'
import DownloadButton from './DownloadButton'
import PhotoDialogNavigationButton from './PhotoDialogNavigationButton'
import ShareButton from './ShareButton'

type Props = {
  photo: WebPhoto
  isOpen: boolean
  onClose: () => void
  hasPrevious: boolean
  hasNext: boolean
  onPrevious: () => void
  onNext: () => void
}

const PhotoDialog: FC<Props> = ({
  photo,
  isOpen,
  onClose,
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
}) => {
  function arrowNavigation(event: React.KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      onNext()
    } else if (event.key === 'ArrowLeft') {
      onPrevious()
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 overflow-y-auto"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed top-0 left-0 items-center justify-center w-full h-full transition-all bg-black"
            onKeyDown={arrowNavigation}
            tabIndex={0}
          >
            <PhotoDialogNavigationButton
              onClick={onClose}
              Icon={ArrowLeftIcon}
              className="absolute top-5 left-5 hover:bg-opacity-40"
              circle={false}
              circleOnHover={false}
            />
            <div className="absolute top-8 right-8 flex flex-row">
              <ShareButton type="icon" className="mr-4" />
              <DownloadButton
                url={photo.previewImageUrl}
                size={10}
                className="text-white"
              />
            </div>
            {hasPrevious && (
              <PhotoDialogNavigationButton
                onClick={onPrevious}
                Icon={ChevronLeftIcon}
                className="absolute top-1/2 left-5"
              />
            )}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-0"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-0"
            >
              <img
                src={photo.previewImageUrl}
                alt={photo.id}
                className="object-contain h-screen mx-auto select-none"
              />
            </Transition.Child>
            {hasNext && (
              <PhotoDialogNavigationButton
                onClick={onNext}
                Icon={ChevronRightIcon}
                className="absolute top-1/2 right-5"
              />
            )}
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default PhotoDialog
