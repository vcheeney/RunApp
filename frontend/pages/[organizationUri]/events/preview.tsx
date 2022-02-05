// todo: event preview page
import { useRouter } from 'next/router'
import React from 'react'
import EventPageContent from '../../../components/EventPageContent'
import { CreateEventDto } from '../../../services/api'
import { previewWebPhotos } from '../../../utils/preview'

const EventPreviewIframe = () => {
  const router = useRouter()
  const orgName = router.query.orgName as string
  const orgUri = router.query.orgUri as string
  const previewEvent: CreateEventDto = {
    name: router.query.name as string,
    uri: router.query.uri as string,
    image: router.query.image as string,
    eventDate: router.query.eventDate as string,
  }

  if (!router.isReady) return null

  return (
    <EventPageContent
      orgName={orgName}
      orgUri={orgUri}
      event={previewEvent}
      photos={previewWebPhotos}
      preview
    />
  )
}

export default EventPreviewIframe
