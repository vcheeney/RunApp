import { ArrowSmLeftIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import Button from './Button'
import Layout from './Layout'

type Props = {
  title: string
  buttonText: string
  fields: JSX.Element
  centerSection: JSX.Element
}

const ResourceFormLayout: FC<Props> = ({
  title,
  fields,
  buttonText,
  centerSection,
}) => {
  const router = useRouter()
  return (
    <Layout>
      <div className="flex h-full overflow-y-hidden">
        <div className="flex flex-col flex-grow flex-shrink-0 h-full bg-white shadow-md md:flex-grow-0 w-96">
          <div className="p-4 mb-2">
            <button
              aria-label="Go back"
              onClick={() => router.back()}
              className="flex items-center space-x-1"
              type="button"
            >
              <ArrowSmLeftIcon className="w-4 h-4" />
              <p>Go back</p>
            </button>
            <p className="text-xl font-medium md:text-2xl">{title}</p>
          </div>
          <div className="relative flex-grow border-t border-b">
            <div className="absolute inset-0 p-4 space-y-4 overflow-y-scroll">
              {fields}
            </div>
          </div>
          <div className="p-4">
            <Button
              type="submit"
              text={buttonText}
              variant="primary"
              size="full"
              uppercase
            />
          </div>
        </div>
        <div className="relative flex-grow hidden md:flex">
          <div className="absolute inset-0">{centerSection}</div>
        </div>
      </div>
    </Layout>
  )
}

export default ResourceFormLayout
