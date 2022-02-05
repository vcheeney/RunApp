import axios, { AxiosRequestConfig } from 'axios'
import { shouldUseEmulators } from '../../config/firebase'

export const axiosBaseUrl = shouldUseEmulators
  ? 'http://localhost:5001/firebaseprojectid/us-central1/api'
  : 'https://us-central1-firebaseprojectid.cloudfunctions.net/api'

export const axiosConfig: AxiosRequestConfig = {
  baseURL: axiosBaseUrl,
}

const axiosBackendClient = axios.create(axiosConfig)

export function setAuthorizationHeader(token?: string) {
  if (token) {
    axiosBackendClient.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete axiosBackendClient.defaults.headers.common.Authorization
  }
}

export default axiosBackendClient
