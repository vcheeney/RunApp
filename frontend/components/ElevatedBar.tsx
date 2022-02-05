import React, { FC } from 'react'

type Props = {
  className?: string
}

const ElevatedBar: FC<Props> = ({ children, className }) => {
  return <div className={`z-10 bg-white shadow ${className}`}>{children}</div>
}

export default ElevatedBar
