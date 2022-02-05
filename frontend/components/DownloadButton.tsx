import { DownloadIcon } from '@heroicons/react/solid'
import React, { FC } from 'react'

type Props = {
  url: string
  className?: string
  size?: number
}

const DownloadButton: FC<Props> = ({ url, className = '', size = 6 }) => {
  return (
    <a href={url} download>
      <DownloadIcon
        className={`w-${size} h-${size} cursor-pointer ${className}`}
      />
    </a>
  )
}

export default DownloadButton
