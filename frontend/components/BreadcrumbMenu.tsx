import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import React, { FC } from 'react'

type Link = { url: string; text: string }

type Props = {
  links: Array<Link>
}

const BreadcrumbMenu: FC<Props> = ({ links }) => {
  if (links.length >= 2) {
    const isLast = (index: number) => index === links.length - 1
    const beforeLast = links[links.length - 2]
    return (
      <div className="whitespace-nowrap">
        <div className="items-center hidden space-x-1 font-medium sm:flex">
          {links.map((link, index) => {
            return isLast(index) ? (
              <p
                className="overflow-x-hidden text-primary-500 whitespace-nowrap overflow-ellipsis"
                key={link.text}
              >
                {link.text}
              </p>
            ) : (
              <React.Fragment key={link.text}>
                <Link href={link.url}>
                  <a className="cursor-pointer hover:underline hover:text-primary-500">
                    {link.text}
                  </a>
                </Link>
                <ChevronRightIcon className="flex-shrink-0 block w-4 h-4 text-gray-400" />
              </React.Fragment>
            )
          })}
        </div>
        <div className="flex items-center space-x-1 sm:hidden">
          <ChevronLeftIcon className="w-4 h-4 text-gray-400" />
          <Link href={beforeLast.url}>
            <a className="font-medium cursor-pointer hover:underline hover:text-primary-500">
              {beforeLast.text}
            </a>
          </Link>
        </div>
      </div>
    )
  }
  return (
    <p className="font-medium text-primary-500" key={links[0].text}>
      {links[0].text}
    </p>
  )
}

export default BreadcrumbMenu
