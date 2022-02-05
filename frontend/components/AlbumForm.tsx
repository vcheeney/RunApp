import { Formik, FormikHelpers } from 'formik'
import React, { FC } from 'react'
import * as Yup from 'yup'
import { WebPhoto } from '../services/api'
import { slugify } from '../utils/utils'

import FilesSelector, { PhotoSelection } from './FilesSelector'
import Input from './Input'
import ResourceFormLayout from './ResourceFormLayout'

type Props = {
  title: string
  submitButtonText: string
  initialAlbumName: string
  initialAlbumUri: string
  initialPhotos?: WebPhoto[]

  onSubmit: (
    values: {
      name: string
      uri: string
      photosSelection: PhotoSelection
    },
    helpers: FormikHelpers<{
      name: any
      uri: any
      photosSelection: PhotoSelection
    }>
  ) => void
}

const AlbumForm: FC<Props> = ({
  title,
  submitButtonText,
  initialAlbumName,
  initialAlbumUri,
  initialPhotos = [],
  onSubmit,
}) => {
  const albumSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    uri: Yup.string().required('URI is required'),
    photosSelection: Yup.object().shape({
      files: Yup.array().when('webPhotos', {
        is: (val: WebPhoto[]) => val.length == 0,
        then: Yup.array().min(1, 'Add at least one photo'),
      }),
      webPhotos: Yup.array().required(),
    }),
  })

  return (
    <>
      <Formik
        initialValues={{
          name: initialAlbumName,
          uri: initialAlbumUri,
          photosSelection: {
            files: [] as File[],
            webPhotos: initialPhotos,
          },
        }}
        validationSchema={albumSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <ResourceFormLayout
              title={title}
              buttonText={submitButtonText}
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
                </>
              }
              centerSection={
                <div className="h-full overflow-y-scroll">
                  <FilesSelector
                    name="photosSelection"
                    id="photosSelection"
                    type="photosSelection"
                  />
                </div>
              }
            />
          </form>
        )}
      </Formik>
    </>
  )
}

export default AlbumForm
