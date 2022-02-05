import { CollectionIcon } from '@heroicons/react/solid'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import {
  AdminAddButton,
  AdminEditButton,
} from '../../../components/AdminButton'
import AdminButtonDisclosure from '../../../components/AdminButtonDisclosure'
import AdminPanel from '../../../components/AdminPanel'
import BreadcrumbMenu from '../../../components/BreadcrumbMenu'
import EventPageContent from '../../../components/EventPageContent'
import FullPageSpinnerWithLayout from '../../../components/FullPageSpinnerWithLayout'
import Layout from '../../../components/Layout'
import NoContentWithLayout from '../../../components/NoContentWithLayout'
import { withUser, WithUserPage } from '../../../components/withUser'
import {
  useEvent,
  useEventAlbums,
  useOrganization,
  usePhotos,
} from '../../../services/api/queries'
import { PhotoSearchParams } from '../../../utils/types'
import { isUserAnOrganizationAdmin } from '../../../utils/utils'

export const emptySearchParams = {
  bibNumber: '',
  albumsIds: [],
}

const Event: WithUserPage = ({ user }) => {
  const router = useRouter()

  const [searchParams, setSearchParams] =
    useState<PhotoSearchParams>(emptySearchParams)

  const orgUri = router.query.organizationUri as string
  const eventUri = router.query.eventUri as string
  const albumId = router.query.albumId as string

  useEffect(() => {
    if (albumId) setSearchParams({ ...searchParams, albumsIds: [albumId] })
  }, [router.isReady])

  const { data: organization, isLoading: organizationLoading } =
    useOrganization(orgUri)
  const { data: albums, isLoading: albumsLoading } = useEventAlbums(
    orgUri,
    eventUri
  )
  const { data: event, isLoading: eventLoading } = useEvent(orgUri, eventUri)
  const { data: photos, isLoading: photosLoading } = usePhotos({
    eventId: event?.id as string,
    bibNumber: searchParams.bibNumber,
    albumsIds: searchParams.albumsIds,
  })

  if (organizationLoading || albumsLoading || eventLoading)
    return <FullPageSpinnerWithLayout />

  if (!organization)
    return <NoContentWithLayout text="This organization does not exist" />
  if (!event) return <NoContentWithLayout text="This event does not exist" />

  return (
    <>
      <NextSeo title={event.name} />
      <Layout
        adminPanel={
          isUserAnOrganizationAdmin(organization, user) && (
            <AdminPanel
              title="Manage event"
              resourceName={event.name}
              breadbrumbNavigation={
                <BreadcrumbMenu
                  links={[
                    {
                      text: organization?.name,
                      url: `/${organization.uri}`,
                    },
                    {
                      text: event?.name,
                      url: `/${event.uri}`,
                    },
                  ]}
                />
              }
            >
              <AdminEditButton
                title="Edit event"
                onClick={() =>
                  router.push(`/${organization.uri}/${event.uri}/modify`)
                }
              />
              <AdminButtonDisclosure
                title="Albums"
                icon={<CollectionIcon className="w-3/4" />}
                actionItems={
                  <div>
                    {albums?.map((album) => (
                      <AdminEditButton
                        key={album.id}
                        title={album.name}
                        onClick={() =>
                          router.push(
                            `/${organization.uri}/${event.uri}/${album.uri}/modify`
                          )
                        }
                      />
                    ))}
                    <AdminAddButton
                      title="Add an album"
                      onClick={() =>
                        router.push(
                          `/${organization.uri}/${event.uri}/albums/create`
                        )
                      }
                    />
                  </div>
                }
              />
            </AdminPanel>
          )
        }
      >
        <EventPageContent
          orgName={organization.name}
          orgUri={organization.uri}
          albums={albums}
          event={event}
          photos={photos}
          isUserAdmin={isUserAnOrganizationAdmin(organization, user)}
          setSearchParams={setSearchParams}
          searchParams={searchParams}
        />
      </Layout>
    </>
  )
}

export default withUser(Event)
