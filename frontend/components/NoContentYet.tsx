import { PlusSmIcon } from '@heroicons/react/solid'
import React, { FC } from 'react'
import LinkButton from './LinkButton'

type Props = {
  question: string
  image: string
  buttonText: string
  href: string
}

const NoContentYet: FC<Props> = ({ question, image, href, buttonText }) => {
  return (
    <div>
      <p className="mb-6 text-4xl font-bold">{question}</p>
      <img src={image} className="mb-6 w-72" />
      <LinkButton href={href} variant="primary" size="large">
        <div className="flex items-center justify-center space-x-2">
          <PlusSmIcon className="w-5 h-5" />
          <span>{buttonText}</span>
        </div>
      </LinkButton>
    </div>
  )
}

export default NoContentYet
