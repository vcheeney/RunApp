import React, { FC } from 'react'

type Props = {
  title: string
}

const OrderDetailsInformationLine: FC<Props> = ({ title, children }) => {
  return (
    <div className="flex flex-col items-start text-sm font-medium sm:space-x-2 sm:items-center sm:flex-row">
      <span className="text-gray-400">{title}</span>
      <span className="hidden text-gray-400 sm:block">|</span>
      {children}
    </div>
  )
}

export default OrderDetailsInformationLine
