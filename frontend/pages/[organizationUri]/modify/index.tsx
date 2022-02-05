import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import React from 'react'
import { v4 } from 'uuid'
import FullPageSpinnerWithLayout from '../../../components/FullPageSpinnerWithLayout'
import NoContentWithLayout from '../../../components/NoContentWithLayout'
import OrganizationForm from '../../../components/OrganizationForm'
import {
  withRequiredUser,
  WithRequiredUserPage,
} from '../../../components/withUser'
import { organizationsApi } from '../../../services/api'
import { useOrganization } from '../../../services/api/queries'
import { removeByDlUrlPath, uploadToStorage } from '../../../services/storage'

const ModifyOrganization: WithRequiredUserPage = ({}) => {
  const router = useRouter()

  const orgUri = router.query.organizationUri as string
  const { data: org, status: orgStatus } = useOrganization(orgUri)

  if (orgStatus === 'loading') return <FullPageSpinnerWithLayout />
  if (!org)
    return <NoContentWithLayout text="This organization does not exist" />

  const initialValues = {
    name: org.name,
    uri: org.uri,
    logo: org.logo,
    banner: org.banner,
  }

  return (
    <>
      <NextSeo title={`Edit ${org.name}`} />
      <OrganizationForm
        title="Edit an organization"
        buttonText="Edit the organization"
        initialValues={initialValues}
        onSubmit={async (values) => {
          // Supprimer le logo déjà associé si celui-ci a été modifié
          if (initialValues.logo && values.logo !== initialValues.logo) {
            await removeByDlUrlPath(`organization-logo/${initialValues.logo}`)
          }

          // Supprimer la bannière déjà associée si celle-ci a été modifiée
          if (initialValues.banner && values.banner !== initialValues.banner) {
            await removeByDlUrlPath(
              `organization-banner/${initialValues.banner}`
            )
          }

          // Créer l'objet contenant les données à envoyer
          const dto = {
            id: org.id,
            ...values,
            logo:
              values.logo && typeof values.logo !== 'string'
                ? await uploadToStorage(
                    values.logo,
                    `organization-logo/${v4()}`
                  )
                : values.logo || '',
            banner:
              values.banner && typeof values.banner !== 'string'
                ? await uploadToStorage(
                    values.banner,
                    `organization-banner/${v4()}`
                  )
                : values.banner || '',
          }

          // Effectuer la requiête à l'API
          const res = await organizationsApi.updateOrganization({
            orgUri: router.query.organizationUri as string,
            updateOrganizationDto: dto,
          })

          return res.data
        }}
      />
    </>
  )
}

export default withRequiredUser(ModifyOrganization)
