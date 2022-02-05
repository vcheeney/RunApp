import { Formik } from 'formik'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import * as Yup from 'yup'
import { RacingEvent } from '../services/api/generated'
import { queryClient, useOrganization } from '../services/api/queries'
import { getImagePreview, ImageValue } from '../utils/files'
import { slugify } from '../utils/utils'
import FileInput from './FileInput'
import Input from './Input'
import ResourceFormLayout from './ResourceFormLayout'
import ResourcePreview from './ResourcePreview'

type EventFormValues = {
  name: string
  uri: string
  eventDate: string
  image: ImageValue
}

type Props = {
  title: string
  buttonText: string
  initialValues: EventFormValues
  onSubmit: (values: EventFormValues) => Promise<RacingEvent>
}

const EventForm: FC<Props> = ({
  title,
  buttonText,
  initialValues,
  onSubmit,
}) => {
  const router = useRouter()

  const orgUri = router.query.organizationUri as string
  const { data: org } = useOrganization(orgUri)

  const eventSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    uri: Yup.string().required('URI is required'),
    eventDate: Yup.string().required('Event date is required'),
    image: Yup.mixed().test('fileType', 'File is not compatible', (value) => {
      if (typeof value === 'string') return true
      const isValidFile = value
        ? ['', 'image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(
            value.type
          )
        : true
      return isValidFile
    }),
  })

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={eventSchema}
      onSubmit={async (values, helpers) => {
        try {
          const event = await onSubmit(values)
          queryClient.resetQueries()
          router.replace(`/${orgUri}/${event.uri}`)
        } catch (error: any) {
          console.error(error)
          for (const key in error.response.data.details) {
            if (error.response.data.details.hasOwnProperty(key)) {
              const message = error.response.data.details[key].message
              const parsedKey = key.includes('.') ? key.split('.')[1] : key
              helpers.setFieldError(parsedKey, message)
            }
          }
        }
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <ResourceFormLayout
            title={title}
            buttonText={buttonText}
            fields={
              <>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  onChange={(event: any) => {
                    formik.handleChange(event)
                    if (!formik.touched.uri) {
                      formik.setFieldValue('uri', slugify(event.target.value))
                    }
                  }}
                  label="Name"
                />
                <Input id="uri" name="uri" type="text" label="Uri" />
                <Input
                  id="eventDate"
                  name="eventDate"
                  type="date"
                  label="Event date"
                />
                <FileInput name="image" label="Logo" />
              </>
            }
            centerSection={
              <ResourcePreview
                previewPath={`${orgUri}/${formik.values.uri}`}
                iframePath={`/${orgUri}/events/preview`}
                values={{
                  ...formik.values,
                  image: getImagePreview(formik.values.image),
                  orgName: org?.name,
                  orgUri: org?.uri,
                }}
              />
            }
          />
        </form>
      )}
    </Formik>
  )
}

export default EventForm
