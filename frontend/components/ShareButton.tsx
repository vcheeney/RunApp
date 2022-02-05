import { Menu, Transition } from '@headlessui/react'
import { ShareIcon } from '@heroicons/react/outline'
import { LinkIcon } from '@heroicons/react/solid'
import React, { FC, Fragment } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { FaFacebookF, FaRedditAlien, FaTwitter } from 'react-icons/fa'
import {
  FacebookShareButton,
  RedditShareButton,
  TwitterShareButton,
} from 'react-share'
import { getButtonStyles } from './Button'

type Props = {
  preview?: boolean
  rightSide?: boolean
  className?: string
  type?: 'text' | 'icon'
  linkUrl?: string
}

const ShareButton: FC<Props> = ({
  preview,
  rightSide = true,
  className = '',
  type = 'text',
  linkUrl = window.location.href,
}) => {
  function copyLink() {
    navigator.clipboard.writeText(linkUrl)
    toast.success('Lien copié!')
  }

  const positioning = rightSide
    ? 'right-0 origin-top-right'
    : 'left-0 origin-top-left'

  const menuItemStyle = (active: boolean) =>
    `${
      active ? 'bg-primary-500 text-white' : 'text-gray-900'
    } group flex rounded-md items-center w-full px-2 py-2`

  return (
    <Menu as="div" className={`relative inline-block text-left ${className}`}>
      {type == 'text' && (
        <Menu.Button
          className={getButtonStyles({ disabled: preview, variant: 'primary' })}
          disabled={preview}
        >
          <div className="flex items-center space-x-4">
            <ShareIcon className="w-5 h-5 mr-2" aria-hidden="true" />
            Share
          </div>
        </Menu.Button>
      )}
      {type == 'icon' && (
        <Menu.Button disabled={preview} className="text-white">
          <ShareIcon className="w-5 h-5 mr-2 h-10 w-10" aria-hidden="true" />
        </Menu.Button>
      )}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`absolute w-48 mt-2 bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10 ${positioning}`}
        >
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button onClick={copyLink} className={menuItemStyle(active)}>
                  <LinkIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                  Copier le lien
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <FacebookShareButton
                  url={linkUrl}
                  resetButtonStyle={false}
                  className={menuItemStyle(active)}
                >
                  <FaFacebookF className="w-5 h-5 mr-2" aria-hidden="true" />
                  Facebook
                </FacebookShareButton>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <TwitterShareButton
                  url={linkUrl}
                  resetButtonStyle={false}
                  className={menuItemStyle(active)}
                >
                  <FaTwitter className="w-5 h-5 mr-2" aria-hidden="true" />
                  Twitter
                </TwitterShareButton>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <RedditShareButton
                  url={linkUrl}
                  resetButtonStyle={false}
                  className={menuItemStyle(active)}
                >
                  <FaRedditAlien className="w-5 h-5 mr-2" aria-hidden="true" />
                  Reddit
                </RedditShareButton>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          success: {
            style: {
              background: '#53a653',
              color: 'white',
              fontWeight: 'bold',
            },
            iconTheme: {
              primary: 'white',
              secondary: '#53a653',
            },
          },
        }}
      />
    </Menu>
  )
}

export default ShareButton
