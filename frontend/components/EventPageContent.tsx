import {
  ArrowLeftIcon,
  ExclamationIcon,
  SearchIcon,
} from '@heroicons/react/solid'
import { Formik, FormikProps } from 'formik'
import { isEqual } from 'lodash'
import Link from 'next/link'
import React, { FC, useRef } from 'react'
import { RiFilterOffLine } from 'react-icons/ri'
import { emptySearchParams } from '../pages/[organizationUri]/[eventUri]'
import { CreateEventDto, WebPhoto } from '../services/api'
import { Album, RacingEvent } from '../services/api/generated'
import { PhotoSearchParams } from '../utils/types'
import Button from './Button'
import Container from './Container'
import ElevatedBar from './ElevatedBar'
import Input from './Input'
import MultiselectInput from './MultiselectInput'
import NoContent from './NoContent'
import NoContentYet from './NoContentYet'
import PhotoGallery from './PhotoGallery'
import ShareButton from './ShareButton'
import Tooltip from './Tooltip'

type Props = {
  orgName: string
  orgUri: string
  event: RacingEvent | CreateEventDto
  albums?: Album[]
  photos?: WebPhoto[]
  searchParams?: PhotoSearchParams
  setSearchParams?: (searchParams: PhotoSearchParams) => void
  preview?: boolean
  isUserAdmin?: boolean
}

const EventPageContent: FC<Props> = ({
  orgName,
  orgUri,
  event,
  albums,
  photos,
  searchParams,
  setSearchParams = () => null,
  preview = false,
  isUserAdmin = false,
}) => {
  const showNoPhotosInEvent = !preview && (!albums || albums.length === 0)
  const showNoPhotosForTheseFilters =
    !showNoPhotosInEvent && photos?.length === 0
  const showFiltersForm = !!albums?.length
  const showGallery = !!photos?.length
  const areSomePhotosStillProcessing = !!photos?.filter(
    (p) => !p.haveBibsBeenChecked
  ).length
  const isInputEnabled = !preview && !areSomePhotosStillProcessing

  const tooltipsBoundaryContainerRef = useRef(null)

  const showReturnToPhotos = searchParams
    ? searchParams.bibNumber.length > 0
    : false

  const showResetFiltersButton = (values: any) => {
    return !isEqual(values, emptySearchParams) && albums?.length !== 1
  }

  function onReturnToPhotos(
    formik: FormikProps<{ bibNumber: string; albumsIds: string[] }>
  ) {
    formik.setFieldValue('bibNumber', '', false)
    formik.submitForm()
  }

  return (
    <div className="max-h-full">
      <ElevatedBar className="pt-4">
        <Container>
          <div className="flex flex-col space-y-2 md:items-end md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex items-center flex-grow space-x-4">
              <img
                src={event.image || '/images/sampleEventPhoto.png'}
                alt="Event image"
                className="object-cover object-center w-16 h-16 rounded shadow"
              />
              <div>
                {preview ? (
                  <p className="font-medium text-gray-400 uppercase">
                    {orgName}
                  </p>
                ) : (
                  <Link href={`/${orgUri}`}>
                    <p className="font-medium text-gray-400 uppercase cursor-pointer hover:text-primary-500 hover:underline">
                      {orgName}
                    </p>
                  </Link>
                )}
                <p className="text-2xl font-medium leading-8 md:text-4xl sm:text-3xl">
                  {event?.name || "Event's name"}
                </p>
              </div>
            </div>
            <div>
              <ShareButton preview={preview} className="float-right" />
            </div>
          </div>
        </Container>
      </ElevatedBar>
      <Container ref={tooltipsBoundaryContainerRef}>
        <div className="h-full mx-auto mt-4 max-w-7xl">
          {showFiltersForm && (
            <Formik
              enableReinitialize
              initialValues={{
                bibNumber: searchParams?.bibNumber ?? '',
                albumsIds:
                  searchParams?.albumsIds ?? albums?.map((a) => a.id) ?? [],
              }}
              onSubmit={setSearchParams}
            >
              {(formik) => (
                <>
                  <form
                    onSubmit={formik.handleSubmit}
                    className="flex justify-between mb-4 "
                  >
                    <div className="flex space-x-2 md:space-x-3">
                      <Tooltip
                        label="The BIB number search feature will be available once all photos have been processed. (should take at most 2 minutes)"
                        boundaryContainer={tooltipsBoundaryContainerRef.current}
                        enabled={!isInputEnabled}
                      >
                        <Input
                          id="bibNumber"
                          name="bibNumber"
                          type="text"
                          placeholder="Bib number"
                          SubmitButtonIcon={SearchIcon}
                          disabled={!isInputEnabled}
                        />
                      </Tooltip>
                      <MultiselectInput
                        submitForm={formik.submitForm}
                        id="albumsIds"
                        name="albumsIds"
                        placeholder="All albums"
                        preview={preview}
                        options={albums.map((album) => ({
                          value: album.id,
                          label: album.name,
                        }))}
                      />
                      {areSomePhotosStillProcessing && (
                        <div className="flex items-center">
                          <Tooltip
                            label="Some photos are still processing"
                            boundaryContainer={
                              tooltipsBoundaryContainerRef.current
                            }
                            enabled={areSomePhotosStillProcessing}
                          >
                            <div className="relative w-8 h-8">
                              <ExclamationIcon className="absolute w-full h-full text-yellow-200 animate-ping" />
                              <ExclamationIcon className="absolute w-full h-full text-yellow-400" />
                            </div>
                          </Tooltip>
                        </div>
                      )}
                      {/* Non inclus dans la V1 */}
                      {/* <button className="flex items-center px-2 py-1 space-x-2 text-gray-600 bg-white border rounded-lg shadow px-2font-semibold hover:bg-gray-100">
                              <HeartIcon className="w-5 h-5" />
                            </button> */}
                    </div>
                    {showResetFiltersButton(formik.values) && (
                      <div className="flex">
                        <Button
                          variant="accent"
                          Icon={RiFilterOffLine}
                          text="Reset filters"
                          onClick={() => {
                            setSearchParams(emptySearchParams)
                            formik.submitForm()
                          }}
                          type="button"
                        />
                      </div>
                    )}
                  </form>
                  {showReturnToPhotos && (
                    <Button
                      Icon={ArrowLeftIcon}
                      text="Back to photos"
                      variant="text"
                      onClick={() => onReturnToPhotos(formik)}
                      type="button"
                      className="mt-2"
                    />
                  )}
                </>
              )}
            </Formik>
          )}
          {showGallery && (
            <PhotoGallery
              photos={photos}
              preview={preview}
              containerRef={tooltipsBoundaryContainerRef}
            />
          )}
          {showNoPhotosForTheseFilters && (
            <NoContent text="No photos match these search filters" />
          )}
          {showNoPhotosInEvent &&
            (isUserAdmin ? (
              <NoContentYet
                href={`/${orgUri}/${event.uri}/albums/create`}
                buttonText="Create an album"
                image="/images/camera.svg"
                question="Ready to create your first album?"
              />
            ) : preview ? null : (
              <NoContent text="This event has no photos" />
            ))}
        </div>
      </Container>
    </div>
  )
}

export default EventPageContent
