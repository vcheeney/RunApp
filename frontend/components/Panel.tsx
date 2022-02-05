import React, { FC } from 'react'

type Props = {
  className?: string
}

const Panel: FC<Props> = ({ className, children }) => {
  return (
    <div
      className={`p-4 bg-gray-50 border-2 border-gray-200 rounded-lg ${className}`}
    >
      {children}
    </div>
  )
}

export default Panel
