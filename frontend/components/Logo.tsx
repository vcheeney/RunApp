import Link from 'next/link'
import React, { FC } from 'react'

type Props = {
  className?: string
}

const Logo: FC<Props> = ({ className, children }) => {
  return (
    <Link href="/">
      <a>
        <img
          src="/images/logo.png"
          alt="icon"
          className="w-10 h-10 cursor-pointer"
        />
      </a>
    </Link>
  )
}

export default Logo
