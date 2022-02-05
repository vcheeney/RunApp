import React, { FC } from 'react'

type Props = {
  photos: JSX.Element[]
  preview: boolean
}

const PhotoGalleryView: FC<Props> = ({ photos, preview }) => {
  return (
    <div className="grid grid-flow-row-dense gap-1 sm:gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {photos}
    </div>
  )
}

export default PhotoGalleryView
