import React, { FC } from 'react'
import LinkButton from './LinkButton'

type Props = {
  className?: string
  href: string
  name: string
  Icon: any
}

const SettingsButton: FC<Props> = ({ children, href, Icon, name }) => {
  return (
    <LinkButton href={href}>
      <div className="flex flex-col items-center justify-center py-8">
        <Icon className="w-16 h-16 text-gray-400" />
        <p>{name}</p>
      </div>
    </LinkButton>
  )
}

export default SettingsButton
