import { useRouter } from 'next/dist/client/router'
import React from 'react'
import AlbumCreation from '../../../../components/AlbumCreation'
import {
  withRequiredUser,
  WithRequiredUserPage,
} from '../../../../components/withUser'

const Create: WithRequiredUserPage = ({}) => {
  const router = useRouter()

  const orgUri = router.query.organizationUri as string
  const eventUri = router.query.eventUri as string

  return <AlbumCreation orgUri={orgUri} eventUri={eventUri}></AlbumCreation>
}

export default withRequiredUser(Create)
