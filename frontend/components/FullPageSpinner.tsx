import React, { FC } from 'react'
import Layout from './Layout'

type Props = {}

const FullPageSpinner: FC<Props> = ({}) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-24 h-24 ease-linear border-8 border-gray-200 rounded-full border-t-gray-400 loader animate-spin"></div>
    </div>
  )
}

export default FullPageSpinner
