import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import React from 'react'
import { v4 } from 'uuid'
import EventForm from '../../../components/EventForm'
import {
  withRequiredUser,
  WithRequiredUserPage,
} from '../../../components/withUser'
import { eventsApi } from '../../../services/api'
import { uploadToStorage } from '../../../services/storage'
import { adjustForTimezone, getDateString } from '../../../utils/utils'

const Create: WithRequiredUserPage = ({}) => {
  const router = useRouter()
  return (
    <>
      <NextSeo title="Create an event" />
      <EventForm
        title="Create an event"
        buttonText="Create the event"
        initialValues={{
          name: '',
          uri: '',
          eventDate: getDateString(new Date()),
          image: null,
        }}
        onSubmit={async (values) => {
          // Créer l'objet contenant les données à envoyer
          const dto = {
            ...values,
            eventDate: adjustForTimezone(
              new Date(values.eventDate)
            ).toISOString(),
            image:
              values.image && typeof values.image !== 'string'
                ? await uploadToStorage(values.image, `event-logo/${v4()}`)
                : '',
          }

          // Effectuer la requête à l'API
          const res = await eventsApi.createEvent({
            orgUri: router.query.organizationUri as string,
            body: dto,
          })

          return res.data
        }}
      />
    </>
  )
}

export default withRequiredUser(Create)
