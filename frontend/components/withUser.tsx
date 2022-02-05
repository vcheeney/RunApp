/* eslint-disable react/display-name */
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { User } from '../utils/types'
import { useAuth } from './contexts/AuthContext'
import FullPageSpinnerWithLayout from './FullPageSpinnerWithLayout'

export type WithUserPage = FC<{ user?: User }>

export function withUser(Component: WithUserPage) {
  return () => {
    const { isLoading, user } = useAuth()
    if (isLoading) return <FullPageSpinnerWithLayout />
    return <Component user={user} />
  }
}

export type WithRequiredUserPage = FC<{ user: User }>

export function withRequiredUser(Component: WithRequiredUserPage) {
  return () => {
    const { isConnected, isLoading, user } = useAuth()
    const router = useRouter()
    if (isLoading) return <FullPageSpinnerWithLayout />
    if (!isConnected) router.replace('/')
    if (!isConnected) return <FullPageSpinnerWithLayout />
    if (user) return <Component user={user} />
    return <span>Should not show this</span>
  }
}

export function withoutUser(Component: FC) {
  return () => {
    const { isConnected, isLoading, user } = useAuth()
    const router = useRouter()
    if (isLoading) return <FullPageSpinnerWithLayout />
    if (isConnected) router.replace('/account')
    return <Component />
  }
}
