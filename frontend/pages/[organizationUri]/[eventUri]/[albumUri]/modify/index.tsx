import { useRouter } from 'next/dist/client/router'
import React, { useRef, useState } from 'react'
import * as Yup from 'yup'
import ActionStepIndicator from '../../../../../components/ActionStepIndicator'
import AlbumCreation from '../../../../../components/AlbumCreation'
import AlbumCreationModal from '../../../../../components/AlbumCreationModal'
import AlbumForm from '../../../../../components/AlbumForm'
import Button from '../../../../../components/Button'
import FullPageSpinnerWithLayout from '../../../../../components/FullPageSpinnerWithLayout'
import Modal from '../../../../../components/Modal'
import NoContentWithLayout from '../../../../../components/NoContentWithLayout'
import {
  WithRequiredUserPage,
  withRequiredUser,
} from '../../../../../components/withUser'
const Modify: WithRequiredUserPage = ({}) => {
  const router = useRouter()

  const eventUri = router.query.eventUri as string
  const albumUri = router.query.albumUri as string
  const orgUri = router.query.organizationUri as string

  return (
    <AlbumCreation
      type="modification"
      orgUri={orgUri}
      eventUri={eventUri}
      originalAlbumUri={albumUri}
    ></AlbumCreation>
  )
}

export default withRequiredUser(Modify)
