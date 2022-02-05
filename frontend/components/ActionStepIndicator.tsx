import {
  CheckIcon,
  DotsHorizontalIcon,
  ExclamationIcon,
} from '@heroicons/react/solid'
import React, { FC } from 'react'

type Props = {
  done: boolean
  text: string
  error?: string
}

const ActionStepIndicator: FC<Props> = ({ done, text, error }) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex-grow-0 flex-shrink-0 w-8">
        {error ? (
          <ExclamationIcon className="text-red-500" />
        ) : done ? (
          <CheckIcon className="text-primary-500" />
        ) : (
          <DotsHorizontalIcon className="text-gray-500 animate-pulse" />
        )}
      </div>
      {error ? (
        <p className="text-lg font-medium text-red-500">{error}</p>
      ) : (
        <p className="text-lg font-medium text-gray-700">{text}</p>
      )}
    </div>
  )
}

export default ActionStepIndicator
