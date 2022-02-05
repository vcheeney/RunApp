import Link from 'next/link'
import React from 'react'
import BreadcrumbMenu from '../components/BreadcrumbMenu'
import SettingsPageLayout from '../components/SettingsPageLayout'
import { withRequiredUser, WithRequiredUserPage } from '../components/withUser'

const Orders: WithRequiredUserPage = ({ user }) => {
  return (
    <SettingsPageLayout
      name="Vos commandes"
      breadbrumbNavigation={
        <BreadcrumbMenu
          links={[
            {
              text: 'My account',
              url: '/account',
            },
            {
              text: 'Vos commandes',
              url: '/orders',
            },
          ]}
        />
      }
    >
      <Link href="/orders/abc">
        <p className="cursor-pointer">commande #1</p>
      </Link>
    </SettingsPageLayout>
  )
}

export default withRequiredUser(Orders)
