import { NextSeo } from 'next-seo'
import React from 'react'
import { v4 } from 'uuid'
import OrganizationForm from '../../../../components/OrganizationForm'
import {
  withRequiredUser,
  WithRequiredUserPage,
} from '../../../../components/withUser'
import { organizationsApi } from '../../../../services/api'
import { uploadToStorage } from '../../../../services/storage'

const Create: WithRequiredUserPage = () => {
  return (
    <>
      <NextSeo title="Create an organization" />
      <OrganizationForm
        title="Create an organization"
        buttonText="Create the organization"
        initialValues={{
          name: '',
          uri: '',
          logo: '',
          banner: '',
        }}
        onSubmit={async (values) => {
          // Créer l'objet contenant les données à envoyer
          const dto = {
            ...values,
            logo:
              values.logo && typeof values.logo !== 'string'
                ? await uploadToStorage(values.logo, `org-logo/${v4()}`)
                : '',
            banner:
              values.banner && typeof values.banner !== 'string'
                ? await uploadToStorage(values.banner, `org-banner/${v4()}`)
                : '',
          }

          // Effectuer la requiête à l'API
          const res = await organizationsApi.createOrganization({
            body: dto,
          })

          return res.data
        }}
      />
    </>
  )
}

export default withRequiredUser(Create)
