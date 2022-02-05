import { NextSeo } from 'next-seo'
import React from 'react'
import BreadcrumbMenu from '../../components/BreadcrumbMenu'
import SettingsPageLayout from '../../components/SettingsPageLayout'
import {
  withRequiredUser,
  WithRequiredUserPage,
} from '../../components/withUser'

const Information: WithRequiredUserPage = ({ user }) => {
  return (
    <>
      <NextSeo title="My information" />
      <SettingsPageLayout
        name="My information"
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
                text: 'My information',
                url: '/account/information',
              },
            ]}
          />
        }
      >
        <div></div>
      </SettingsPageLayout>
    </>
  )
}

export default withRequiredUser(Information)
