import { NextSeo } from 'next-seo'
import React, { FC } from 'react'
import LandingLayout from '../components/LandingLayout'
import LinkButton from '../components/LinkButton'
import YoutubeEmbed from '../components/YoutubeEmbed'

const LandingPage: FC = () => (
  <>
    <NextSeo />
    <LandingLayout>
      <div className="py-12 bg-gray-100 md:py-24">
        <div className="grid max-w-screen-lg px-6 mx-auto lg:px-8 xl:px-4 md:grid-cols-2 gap-x-12 lg:gap-x-20">
          <div className="self-center order-2 col-span-6 md:col-span-1 mt-12 md:order-1 md:mt-0">
            <span className="text-blue-500 py-4 text-2xl font-bold">
              RunApp
            </span>
            <h1 className="mb-2 text-3xl font-bold text-gray-800 md:text-4xl lg:text-[2.8rem] md:mb-4 lg:mb-8">
              The Running Events <span className="text-blue-500">Smart</span>{' '}
              Photo Hosting Platform
            </h1>
            <p className="mb-6 text-lg text-gray-600 xl:text-xl lg:mb-8 xl:mb-10">
              Runners spend enough energy during their event, they should not
              have to work to find their photos.
            </p>
            <div className="flex mb-6 space-x-4">
              <LinkButton variant="primary" href="/auth" size="large">
                <span>Get Started</span>
              </LinkButton>
            </div>
          </div>
          <div className="order-1 col-span-6 md:order-2 md:col-span-1">
            <div className="overflow-hidden rounded-lg shadow-xl mt-12">
              <YoutubeEmbed embedId="c3j1qd3TZKU" />
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  </>
)

export default LandingPage
