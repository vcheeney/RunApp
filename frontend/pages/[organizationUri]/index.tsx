import { CollectionIcon } from '@heroicons/react/solid'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import React from 'react'
import { AdminAddButton, AdminEditButton } from '../../components/AdminButton'
import AdminButtonDisclosure from '../../components/AdminButtonDisclosure'
import AdminPanel from '../../components/AdminPanel'
import BreadcrumbMenu from '../../components/BreadcrumbMenu'
import FullPageSpinnerWithLayout from '../../components/FullPageSpinnerWithLayout'
import Layout from '../../components/Layout'
import NoContentWithLayout from '../../components/NoContentWithLayout'
import OrganizationPageContent from '../../components/OrganizationPageContent'
import { withUser, WithUserPage } from '../../components/withUser'
import {
  useOrganization,
  useOrganizationEvents,
} from '../../services/api/queries'
import { isUserAnOrganizationAdmin } from '../../utils/utils'

const OrganizationPage: WithUserPage = ({ user }) => {
  const router = useRouter()
  const orgUri = router.query.organizationUri as string

  const {
    data: organization,
    status: organizationStatus,
    error,
  } = useOrganization(orgUri)
  const { data: events, status: eventStatus } = useOrganizationEvents(orgUri)

  if (organizationStatus === 'loading' || eventStatus === 'loading')
    return <FullPageSpinnerWithLayout />

  if (!organization)
    return <NoContentWithLayout text="This organization does not exist" />

  return (
    <>
      <NextSeo title={organization.name} />
      <Layout
        adminPanel={
          isUserAnOrganizationAdmin(organization, user) && (
            <AdminPanel
              title="Manage organization"
              resourceName={organization?.name}
              breadbrumbNavigation={
                <BreadcrumbMenu
                  links={[
                    {
                      text: organization?.name,
                      url: `/${organization.uri}`,
                    },
                  ]}
                />
              }
            >
              <AdminEditButton
                title="Edit organization"
                onClick={() => router.push(`/${organization.uri}/modify`)}
              />
              <AdminButtonDisclosure
                title="Events"
                icon={<CollectionIcon className="w-3/4" />}
                actionItems={
                  <div>
                    {events?.map((event) => (
                      <AdminEditButton
                        key={event.id}
                        title={event.name}
                        onClick={() =>
                          router.push(
                            `/${organization.uri}/${event.uri}/modify`
                          )
                        }
                      />
                    ))}
                    <AdminAddButton
                      title="Add an event"
                      onClick={() =>
                        router.push(`${organization.uri}/events/create`)
                      }
                    />
                  </div>
                }
              />
            </AdminPanel>
          )
        }
      >
        <OrganizationPageContent
          organization={organization}
          events={events}
          isUserAdmin={isUserAnOrganizationAdmin(organization, user)}
        />
      </Layout>
    </>
  )
}

export default withUser(OrganizationPage)
