import { Formik } from 'formik'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import * as Yup from 'yup'
import { Organization } from '../services/api/generated'
import { queryClient } from '../services/api/queries'
import { getImagePreview, ImageValue } from '../utils/files'
import { slugify } from '../utils/utils'
import FileInput from './FileInput'
import Input from './Input'
import ResourceFormLayout from './ResourceFormLayout'
import ResourcePreview from './ResourcePreview'

type OrganizationFormValues = {
  name: string
  uri: string
  logo: ImageValue
  banner: ImageValue
}

type Props = {
  title: string
  buttonText: string
  initialValues: OrganizationFormValues
  onSubmit: (values: OrganizationFormValues) => Promise<Organization>
}

const OrganizationForm: FC<Props> = ({
  title,
  buttonText,
  initialValues,
  onSubmit,
}) => {
  const router = useRouter()

  const organizationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    uri: Yup.string().required('URI is required'),
    logo: Yup.mixed().test('fileType', 'File is not compatible', (value) => {
      if (typeof value === 'string') return true
      const isValidFile = value
        ? ['', 'image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(
            value.type
          )
        : true
      return isValidFile
    }),
    banner: Yup.mixed().test('fileType', 'File is not compatible', (value) => {
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
      validationSchema={organizationSchema}
      onSubmit={async (values, helpers) => {
        try {
          const org = await onSubmit(values)
          queryClient.resetQueries()
          router.replace(`/${org.uri}`)
        } catch (error: any) {
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
                  label="Name"
                  onChange={(event: any) => {
                    formik.handleChange(event)
                    if (!formik.touched.uri) {
                      formik.setFieldValue('uri', slugify(event.target.value))
                    }
                  }}
                />
                <Input id="uri" name="uri" type="text" label="Uri" />
                <FileInput id="Logo" name="logo" label="Logo" />
                <FileInput id="Bannière" name="banner" label="Banner" />
              </>
            }
            centerSection={
              <ResourcePreview
                previewPath={`${formik.values.uri}`}
                iframePath="/account/organizations/create/preview"
                values={{
                  ...formik.values,
                  logo: getImagePreview(formik.values.logo),
                  banner: getImagePreview(formik.values.banner),
                }}
              />
            }
          />
        </form>
      )}
    </Formik>
  )
}

export default OrganizationForm
