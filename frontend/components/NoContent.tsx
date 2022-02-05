import React, { FC } from 'react'

type Props = {
  text?: string
}

const NoContent: FC<Props> = ({ text = "Il n'y a rien ici..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 space-y-4">
      <img src="/images/sadFace.png" className="w-40" />
      <p className="text-xl font-bold text-gray-300">{text}</p>
    </div>
  )
}

export default NoContent
