import { NextSeo } from 'next-seo'
import React from 'react'
import BreadcrumbMenu from '../../../components/BreadcrumbMenu'
import FullPageSpinnerWithLayout from '../../../components/FullPageSpinnerWithLayout'
import ImagePlaceholder from '../../../components/ImagePlaceholder'
import LinkButton from '../../../components/LinkButton'
import NoContentYet from '../../../components/NoContentYet'
import SettingsPageLayout from '../../../components/SettingsPageLayout'
import {
  withRequiredUser,
  WithRequiredUserPage,
} from '../../../components/withUser'
import { useUserOrganizations } from '../../../services/api/queries'

const Organizations: WithRequiredUserPage = ({ user }) => {
  const { data, error, isLoading } = useUserOrganizations(user.id)

  if (isLoading) return <FullPageSpinnerWithLayout />

  return (
    <>
      <NextSeo title="My organizations" />
      <SettingsPageLayout
        name={`My organizations (${data?.length || 0})`}
        breadbrumbNavigation={
          <BreadcrumbMenu
            links={[
              {
                text: 'Home',
                url: '/',
              },
              {
                text: 'My account',
                url: '/account',
              },
              {
                text: 'My organizations',
                url: '/account/organizations',
              },
            ]}
          />
        }
        actions={
          <div>
            <LinkButton href="/account/organizations/create">
              <span>Create an organization</span>
            </LinkButton>
          </div>
        }
      >
        <div>
          <div className="grid gap-4 mb-8">
            {data?.length ? (
              data?.map((org) => (
                <LinkButton href={`/${org.uri}`} key={org.uri}>
                  <div className="flex p-2 space-x-4">
                    <div className="w-16 h-16 overflow-hidden rounded">
                      <ImagePlaceholder src={org.logo} />
                    </div>
                    <div>
                      <p>{org.name}</p>
                    </div>
                  </div>
                </LinkButton>
              ))
            ) : (
              <NoContentYet
                question="Are you a race organizer?"
                buttonText="Create an organization"
                href="/account/organizations/create"
                image="/images/organization.svg"
              />
            )}
          </div>
        </div>
      </SettingsPageLayout>
    </>
  )
}

export default withRequiredUser(Organizations)
