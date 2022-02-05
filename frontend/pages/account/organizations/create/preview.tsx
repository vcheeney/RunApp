import { useRouter } from 'next/router'
import React from 'react'
import OrganizationPageContent from '../../../../components/OrganizationPageContent'
import { CreateOrganizationDto } from '../../../../services/api'
import { previewEvents } from '../../../../utils/preview'

const OrganizationPreviewIframe = () => {
  const router = useRouter()
  const previewOrganization: CreateOrganizationDto = {
    name: router.query.name as string,
    uri: router.query.uri as string,
    logo: router.query.logo as string,
    banner: router.query.banner as string,
  }

  if (!router.isReady) return null

  return (
    <OrganizationPageContent
      organization={previewOrganization}
      events={previewEvents}
      preview
    />
  )
}

export default OrganizationPreviewIframe
