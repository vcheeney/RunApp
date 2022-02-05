import { NextSeo } from 'next-seo'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { v4 } from 'uuid'
import EventForm from '../../../../components/EventForm'
import FullPageSpinnerWithLayout from '../../../../components/FullPageSpinnerWithLayout'
import NoContentWithLayout from '../../../../components/NoContentWithLayout'
import {
  withRequiredUser,
  WithRequiredUserPage,
} from '../../../../components/withUser'
import { eventsApi } from '../../../../services/api'
import { useEvent, useOrganization } from '../../../../services/api/queries'
import {
  removeByDlUrlPath,
  uploadToStorage,
} from '../../../../services/storage'
import { adjustForTimezone, getDateString } from '../../../../utils/utils'

const ModifyEvent: WithRequiredUserPage = ({}) => {
  const router = useRouter()

  const eventUri = router.query.eventUri as string
  const orgUri = router.query.organizationUri as string
  const { data: org, status: orgStatus } = useOrganization(orgUri)
  const { data: event, status: eventStatus } = useEvent(orgUri, eventUri)

  if (orgStatus === 'loading' || eventStatus === 'loading')
    return <FullPageSpinnerWithLayout />

  if (!event) return <NoContentWithLayout text="This event does not exist" />
  if (!org)
    return <NoContentWithLayout text="This organization does not exist" />

  const initialValues = {
    name: event.name,
    uri: event.uri,
    eventDate: event.eventDate,
    image: event.image,
  }

  return (
    <>
      <NextSeo title={`Edit ${event.name}`} />
      <EventForm
        buttonText="Edit the event"
        title="Edit an event"
        initialValues={initialValues}
        onSubmit={async (values) => {
          // Supprimer la photo déjà associé si celle-ci a été modifiée
          if (values.image !== initialValues.image) {
            await removeByDlUrlPath(`event-logo/${initialValues.image}`)
          }

          // Créer l'objet contenant les données à envoyer
          const dto = {
            id: event.id,
            ...values,
            eventDate: adjustForTimezone(
              new Date(values.eventDate)
            ).toISOString(),
            image:
              values.image && typeof values.image !== 'string'
                ? await uploadToStorage(values.image, `event-logo/${v4()}`)
                : values.image || '',
          }

          // Effectuer la requête à l'API
          const res = await eventsApi.updateEvent({
            orgUri: router.query.organizationUri as string,
            updateEventDto: dto,
          })

          return res.data
        }}
      />
    </>
  )
}

export default withRequiredUser(ModifyEvent)
