import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import { QueryClientProvider } from 'react-query'
import 'tailwindcss/tailwind.css'
import AuthProvider from '../components/contexts/AuthContext'
import { queryClient } from '../services/api/queries'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        titleTemplate="RunApp | %s"
        defaultTitle="RunApp"
        description="RunApp is a running events smart photo hosting platform that improves the lives of runners by providing them with a tool to easily search for their race pictures."
        openGraph={{
          type: 'website',
          locale: 'fr_CA',
          url: 'https://runappweb.vercel.app/',
          title: 'RunApp | Hébergement de photos de coureurs',
          images: [
            {
              url: 'https://runappweb.vercel.app/images/og-image.jpg',
              width: 1200,
              height: 630,
              alt: 'RunApp Og Image',
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta
          name="msapplication-config"
          content="/favicons/browserconfig.xml"
        />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <div className="text-gray-700">
            <Component {...pageProps} />
          </div>
        </AuthProvider>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
