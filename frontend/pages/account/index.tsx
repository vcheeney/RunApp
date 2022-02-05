import { FlagIcon, LogoutIcon } from '@heroicons/react/solid'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import React from 'react'
import BreadcrumbMenu from '../../components/BreadcrumbMenu'
import Button from '../../components/Button'
import SettingsButton from '../../components/SettingsButton'
import SettingsPageLayout from '../../components/SettingsPageLayout'
import {
  withRequiredUser,
  WithRequiredUserPage,
} from '../../components/withUser'
import { signOut } from '../../services/auth'

const Account: WithRequiredUserPage = ({ user }) => {
  const router = useRouter()
  return (
    <>
      <NextSeo title="My account" />
      <SettingsPageLayout
        name="My account"
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
            ]}
          />
        }
        actions={
          <div>
            <Button
              text="Sign out"
              Icon={LogoutIcon}
              onClick={async () => {
                await signOut()
                router.replace('/')
              }}
            />
          </div>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {/* <SettingsButton
            href="/account/information"
            Icon={UserCircleIcon}
            name="Vos informations"
          /> */}
          {/* Pas dans la V1 */}
          {/* <SettingsButton
          href="/orders"
          Icon={ShoppingBagIcon}
          name="Vos commandes"
        /> */}
          <SettingsButton
            href="/account/organizations"
            Icon={FlagIcon}
            name="My organizations"
          />
        </div>
      </SettingsPageLayout>
    </>
  )
}

export default withRequiredUser(Account)
