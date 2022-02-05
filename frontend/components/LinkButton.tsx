import Link from 'next/link'
import React, { FC } from 'react'
import { ButtonOptions, getButtonStyles } from './Button'

type Props = {
  href: string
}

const LinkButton: FC<Props & ButtonOptions> = ({
  href,
  children,
  ...buttonBaseProps
}) => {
  if (buttonBaseProps.disabled) {
    return <div className={getButtonStyles(buttonBaseProps)}>{children}</div>
  }
  return (
    <Link href={href}>
      <a className={getButtonStyles(buttonBaseProps)}>{children}</a>
    </Link>
  )
}

export default LinkButton
