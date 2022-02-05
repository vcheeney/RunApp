import React, { FC } from 'react'
import { PhotographIcon } from '@heroicons/react/outline'
import { isValidImageUrl } from '../utils/utils'

type Props = {
  src?: string
}

const ImagePlaceholder: FC<Props> = ({ src }) => {
  return (
    <span className="flex items-center justify-center h-full overflow-hidden text-gray-400 bg-gray-300">
      {src ? <img src={src} /> : <PhotographIcon className="w-16 h-16" />}
    </span>
  )
}

export default ImagePlaceholder
