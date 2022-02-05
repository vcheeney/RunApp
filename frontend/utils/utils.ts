import { Organization } from '../services/api/generated'
import { User } from './types'
import validator from 'validator'

export function isValidImageUrl(url?: string) {
  if (typeof url !== 'string') return false
  return url.match(/\.(jpg|jpeg|gif|png)$/) != null
}

export const slugify = (text: string): string => {
  return text
    .toString() // Cast to string
    .toLowerCase() // Convert the string to lowercase letters
    .normalize('NFD') // The normalize() method returns the Unicode Normalization Form of a given string.
    .trim() // Remove whitespace from both sides of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

export function isUserAnOrganizationAdmin(
  organization: Organization,
  user?: User
) {
  return organization.membersIds.includes(user?.id || '')
}

export function getDateString(date: Date) {
  return `${date.getFullYear()}-${twoDigits(date.getMonth() + 1)}-${twoDigits(
    date.getDate()
  )}`
}

function twoDigits(number: number) {
  return number < 10 ? `0${number}` : number
}

export function isURL(val: any) {
  if (typeof val !== 'string') return false

  return validator.isURL(val, { require_tld: false })
}
export function extractPathStorageFromDlUrl(dlUrl: string) {
  const match = dlUrl.match('/o/(.*)\\?alt')
  if (match) return match[1].replace('%2F', '/')
  throw new Error('Could not extract path from dlUrl')
}

export function adjustForTimezone(date: Date) {
  return new Date(date.getTime() + date.getTimezoneOffset() * 60000)
}
