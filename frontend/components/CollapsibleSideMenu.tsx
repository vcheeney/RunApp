import React, { FC } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { ChevronDoubleRightIcon, MenuIcon, XIcon } from '@heroicons/react/solid'

type Props = { content: JSX.Element }

const CollapsibleSideMenu: FC<Props> = ({ content }) => {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <button aria-label="Open side menu" onClick={openModal}>
        <ChevronDoubleRightIcon className="w-4 h-4" />
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-30 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="h-screen text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black/75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300 transition-"
              enterFrom="opacity-0 -translate-x-full"
              enterTo="opacity-100 translate-x-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 -translate-x-full"
            >
              <div className="block w-full h-full max-w-md p-2 overflow-hidden text-left transition-all transform bg-white shadow-xl">
                <div className="relative">
                  <div className="absolute top-0 right-0 p-4">
                    <button aria-label="Open side menu" onClick={closeModal}>
                      <XIcon className="w-8 h-8" />
                    </button>
                  </div>
                  {content}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default CollapsibleSideMenu
