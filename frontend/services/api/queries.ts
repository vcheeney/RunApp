import { useRef } from 'react'
import { Query, QueryClient, useQuery } from 'react-query'
import { albumsApi, eventsApi, organizationsApi, photosApi } from '.'
import {
  PHOTOS_REFETCH_EXTENDED_DELAY_MS,
  PHOTOS_REFETCH_DELAY_MS,
  PHOTOS_REFETCH_MAX_TIMEPERIOD_MS,
} from '../../config/constants'
import { Album } from './generated'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})

/**
 * Creates a query key to cache the result of the query.
 * For example, for the query that fetches the photos for event1, with album1 and album2 selected, but no
 * bibNumber, the key would be called with the following paraments and would return the following string:
 * key("event1id", ["album1id", "album2id"], undefined)) => "key:event1id:album1id,album2id"
 * @param args The arguments defining the query key
 * @returns The query key
 */
function key(...args: Array<string | Array<string> | undefined>): string {
  return args.reduce<string>((acc, arg) => {
    if (typeof arg === 'string') return `${acc}:${arg}`
    if (Array.isArray(arg)) return `${acc}:${arg.join(',')}`
    return acc
  }, 'key')
}

function shouldRetry(failureCount: number, error: any) {
  console.log('Checking if it should retry. The error: ', error)
  if (error.response) {
    return error.response.status !== 404 && failureCount < 3
  }
  return failureCount < 3
}

export const useUserOrganizations = (userId: string) =>
  useQuery(
    key(userId, 'organizations'),
    () =>
      organizationsApi
        .findUserOrganizations({
          userId,
        })
        .then((res) => res.data),
    { enabled: !!userId }
  )

export const useOrganization = (orgUri: string) =>
  useQuery(
    key(orgUri),
    () =>
      organizationsApi
        .findOrganizationByUri({
          orgUri,
        })
        .then((res) => res.data),
    {
      enabled: !!orgUri,
      retry: shouldRetry,
    }
  )

export const useOrganizationEvents = (orgUri: string) =>
  useQuery(
    key(orgUri, 'events'),
    () =>
      eventsApi
        .findOrganizationsEvents({
          orgUri,
        })
        .then((res) => res.data),
    {
      enabled: !!orgUri,
      retry: shouldRetry,
    }
  )

export const useEvent = (orgUri: string, eventUri: string) =>
  useQuery(
    key(orgUri, eventUri),
    () =>
      eventsApi.findEventByUri({ orgUri, eventUri }).then((res) => res.data),
    {
      enabled: !!orgUri && !!eventUri,
      retry: shouldRetry,
    }
  )

export const useEventAlbums = (orgUri: string, eventUri: string) =>
  useQuery(
    key(orgUri, eventUri, 'albums'),
    () =>
      albumsApi
        .findEventAlbums({
          orgUri,
          eventUri,
        })
        .then((res) => res.data),
    {
      enabled: !!orgUri && !!eventUri,
      retry: shouldRetry,
    }
  )

type UseAlbumOptions = {
  refetchInterval:
    | number
    | false
    | ((
        data: Album | undefined,
        query: Query<Album, unknown, Album, string>
      ) => number | false)
    | undefined
}

export const useAlbum = (
  orgUri: string,
  eventUri: string,
  albumUri: string,
  options: UseAlbumOptions = {
    refetchInterval: false,
  }
) =>
  useQuery(
    key(orgUri, eventUri, albumUri),
    () =>
      albumsApi
        .findAlbumByUri({ orgUri, eventUri, albumUri })
        .then((res) => res.data),
    {
      enabled: !!orgUri && !!eventUri && !!albumUri,
      refetchInterval: options.refetchInterval,
    }
  )

export const usePhotos = (params: {
  eventId: string
  lastPagePhotoId?: string
  albumsIds?: string[]
  bibNumber?: string
}) => {
  const { eventId, lastPagePhotoId, albumsIds, bibNumber } = params
  const lastTimeAmountUncheckedPhotosDecreasedRef = useRef(new Date())
  return useQuery(
    key(eventId, albumsIds, bibNumber),
    () =>
      photosApi
        .findEventPhotos({
          eventId,
          lastPagePhotoId,
          albumsIdsString: albumsIds?.join(',') || '',
          bibNumber,
        })
        .then((res) => res.data),
    {
      enabled: !!eventId,
      retry: shouldRetry,
      refetchInterval: (photos, query) => {
        if (photos) {
          const uncheckedPhotos = photos.filter((p) => !p.haveBibsBeenChecked)
          const previousUncheckedPhotos =
            query.revertState && query.revertState.data
              ? query.revertState.data.filter((p) => !p.haveBibsBeenChecked)
              : uncheckedPhotos
          const now = new Date()
          const date10secondsAgo = new Date(
            now.getTime() - PHOTOS_REFETCH_MAX_TIMEPERIOD_MS
          )

          // If all photos have been checked, we don't need to refetch
          if (uncheckedPhotos.length === 0) {
            return false
          }

          // If the amount of unchecked photos decreased, update the last time amount unchecked photos decreased and refetch in PHOTOS_REFETCH_INTERVAL_MS
          if (uncheckedPhotos.length < previousUncheckedPhotos.length) {
            lastTimeAmountUncheckedPhotosDecreasedRef.current = new Date()
            return PHOTOS_REFETCH_DELAY_MS
          }

          // If the amount of unchecked photos has not changed but it has not been PHOTOS_REFETCH_MAX_TIMEPERIOD_MS yet, refetch in PHOTOS_REFETCH_INTERVAL_MS
          if (
            lastTimeAmountUncheckedPhotosDecreasedRef.current > date10secondsAgo
          ) {
            return PHOTOS_REFETCH_EXTENDED_DELAY_MS
          }

          // In any other case, we don't need to refetch
          return false
        }
        return false
      },
    }
  )
}

export const usePhoto = (photoId: string) =>
  useQuery(
    key(photoId),
    () =>
      photosApi
        .findPhoto({
          photoId,
        })
        .then((res) => res.data),
    { enabled: !!photoId }
  )
