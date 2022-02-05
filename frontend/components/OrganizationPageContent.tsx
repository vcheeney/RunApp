import { EmojiSadIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React, { FC } from 'react'
import { CreateOrganizationDto } from '../services/api'
import { Organization, RacingEvent } from '../services/api/generated'
import Avatar from './Avatar'
import Container from './Container'
import ElevatedBar from './ElevatedBar'
import ImagePlaceholder from './ImagePlaceholder'
import LinkButton from './LinkButton'
import NoContent from './NoContent'
import NoContentYet from './NoContentYet'
import ShareButton from './ShareButton'

type Props = {
  organization?: Organization | CreateOrganizationDto
  events?: Array<RacingEvent>
  preview?: boolean
  isUserAdmin?: boolean
}

const OrganizationPageContent: FC<Props> = ({
  organization,
  events,
  preview = false,
  isUserAdmin = false,
}) => {
  if (!organization)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col items-center justify-center space-y-2 text-gray-700 items">
          <EmojiSadIcon className="w-24 h-24 text-gray-400" />
          <p className="text-xl">This organization does not exist</p>
          <Link href="/">
            <p className="font-medium cursor-pointer hover:underline text-primary-500">
              Back to homepage
            </p>
          </Link>
        </div>
      </div>
    )

  return (
    <div className="max-h-full">
      <ElevatedBar>
        <Container paddingOnSmall={false} paddingBottom={false}>
          <div className="grid bg-white md:mb-8 md:grid-cols-2 lg:grid-cols-5">
            <div className="flex items-center justify-center order-2 px-4 py-4 space-x-3 md:px-0 sm:space-x-4 md:items-start md:flex-col md:order-1 md:space-x-0 lg:col-span-2 md:py-0">
              <Avatar
                className="w-20 h-20 md:w-26 md:h-26"
                name={organization.name}
                src={organization.logo}
              />
              <div className="w-full space-y-1 whitespace-nowrap sm:space-y-2">
                <p className="py-1 overflow-hidden text-2xl font-medium whitespace-nowrap overflow-ellipsis md:text-4xl sm:text-3xl">
                  {organization.name || "Organization's name"}
                </p>
                <ShareButton preview={preview} rightSide={false} />
              </div>
            </div>
            <div className="order-1 h-28 sm:h-36 md:h-60 md:mb-0 md:order-2 lg:col-span-3">
              <ImagePlaceholder src={organization.banner} />
            </div>
          </div>
        </Container>
      </ElevatedBar>
      <Container contentSize="large" className="mt-4">
        <div className="space-y-1 sm:space-y-2">
          <div className="flex items-center space-x-2">
            <p className="text-lg font-medium text-gray-600 sm:text-xl">
              Events
            </p>
            <p className="text-xl font-medium text-gray-300">
              {events ? events.length : 0}
            </p>
          </div>
          <hr />
          {events && events.length ? (
            <>
              <div className="grid grid-cols-1 gap-4 pt-2 sm:pt-4 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <LinkButton
                    href={`${organization.uri}/${event.uri}`}
                    key={event.name}
                    disabled={preview}
                  >
                    <div className="flex items-center w-full p-2 space-x-2 text-left">
                      <img
                        src={event.image || '/images/sampleEventPhoto.png'}
                        alt="Event image"
                        className="object-cover object-center w-20 h-20 rounded shadow"
                      />
                      <div className="flex-grow overflow-hidden">
                        <p className="overflow-hidden text-2xl font-medium whitespace-nowrap overflow-ellipsis">
                          {event.name}
                        </p>
                        <p className="text-sm font-medium text-gray-500">
                          {`${event.photoCount}`} photos
                        </p>
                      </div>
                    </div>
                  </LinkButton>
                ))}
              </div>
            </>
          ) : isUserAdmin ? (
            <NoContentYet
              href={`/${organization.uri}/events/create`}
              buttonText="Create an event"
              image="/images/race.svg"
              question="Ready to create your first event?"
            />
          ) : (
            <NoContent text="This organization has no events" />
          )}
        </div>
      </Container>
    </div>
  )
}

export default OrganizationPageContent
