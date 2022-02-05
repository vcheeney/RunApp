import { UserCircleIcon, LoginIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import auth from '../pages/auth'
import Button from './Button'
import Container from './Container'
import { useAuth } from './contexts/AuthContext'
import Logo from './Logo'

type Props = {
  shadow?: boolean
  showActions?: boolean
}

const Navbar: FC<Props> = ({ shadow = true, showActions = true }) => {
  const auth = useAuth()
  const router = useRouter()

  return (
    <div
      className={`sticky top-0 z-30 bg-white transition-shadow duration-500 ${
        shadow ? 'shadow' : ''
      }`}
    >
      <Container
        className="flex items-center justify-between py-2"
        paddingBottom={false}
      >
        <div className="flex items-center space-x-2">
          <Logo />
        </div>
        {showActions && (
          <div className="flex space-x-4">
            {auth?.isConnected ? (
              <Link href="/account">
                <a>
                  <UserCircleIcon className="w-10 h-10 text-gray-500 transition-all rounded-full cursor-pointer active:text-gray-400 hover:text-gray-300" />
                </a>
              </Link>
            ) : (
              <Button
                text="Sign in"
                Icon={LoginIcon}
                onClick={async () => {
                  router.replace('/auth')
                }}
              />
            )}
          </div>
        )}
      </Container>
    </div>
  )
}

export default Navbar
