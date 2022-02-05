import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import React from 'react'
import AuthForm from '../components/AuthForm'
import Container from '../components/Container'
import Logo from '../components/Logo'
import { withoutUser } from '../components/withUser'

const Auth = () => {
  const router = useRouter()

  return (
    <>
      <NextSeo title="Authentication" />
      <div className="flex flex-col h-screen md:flex-row md:flex">
        <div className="relative flex-grow order-2 overflow-hidden md:flex bg-red-50 md:order-1 max-h-60 min-h-36 md:max-h-full">
          <div className="relative z-20 justify-center w-full h-full p-4 bg-black/70">
            <Container>
              <div className="hidden md:block">
                <Logo />
              </div>
            </Container>
          </div>
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <img
              src={'images/auth.jpg'}
              alt="sample picture of runners"
              className="object-cover min-w-full min-h-full"
            />
          </div>
        </div>
        <div className="flex-grow-0 order-1 w-full p-8 pt-16 space-y-6 bg-gray-100 md:max-w-sm lg:max-w-md md:shadow md:order-2">
          <div className="block md:hidden">
            <Logo />
          </div>
          <p className="text-4xl font-bold text-gray-800">Log in</p>
          <AuthForm
            onSignIn={() => {
              router.replace('/account')
            }}
          />
        </div>
      </div>
    </>
  )
}

export default withoutUser(Auth)
