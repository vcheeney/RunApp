import React, { FC } from 'react'
import { PhotographIcon } from '@heroicons/react/outline'
import { isValidImageUrl } from '../utils/utils'

type Props = {
  src?: string
  name: string
  className: string
}

const Avatar: FC<Props> = ({ src, name, className }) => {
  return (
    <div
      className={`rounded-full shadow ${className} bg-gray-300 flex justify-center items-center overflow-hidden`}
    >
      {src ? (
        <img src={src} />
      ) : (
        <span className="flex items-center justify-center text-gray-400">
          <PhotographIcon className="w-[50%] h-auto" />
        </span>
      )}
    </div>
  )
}

export default Avatar
