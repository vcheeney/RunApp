import axiosBackendClient, { axiosBaseUrl } from './axios-client'
import {
  OrganizationsApi,
  EventsApi,
  AlbumsApi,
  PhotosApi,
  PickOrganizationNameOrUriOrLogoOrBanner,
  Configuration,
  PickRacingEventEventDateOrNameOrImageOrUri,
  PickPhotoExcludeKeyofPhotoSourceImageUrl,
} from './generated'

const configuration: Configuration = {
  basePath: axiosBaseUrl,
  isJsonMime: () => false,
}

export const organizationsApi = new OrganizationsApi(
  configuration,
  undefined,
  axiosBackendClient
)

export const eventsApi = new EventsApi(
  configuration,
  undefined,
  axiosBackendClient
)

export const albumsApi = new AlbumsApi(
  configuration,
  undefined,
  axiosBackendClient
)

export const photosApi = new PhotosApi(
  configuration,
  undefined,
  axiosBackendClient
)

// Somehow openapi-generator does not generate named types based on generics
export type CreateOrganizationDto = PickOrganizationNameOrUriOrLogoOrBanner
export type CreateEventDto = PickRacingEventEventDateOrNameOrImageOrUri
export type WebPhoto = PickPhotoExcludeKeyofPhotoSourceImageUrl
