import React from 'react'
import Link from 'next/link'
import BreadcrumbMenu from '../../components/BreadcrumbMenu'
import OrderDetailsInformationLine from '../../components/OrderDetailsInformationLine'
import { FolderDownloadIcon } from '@heroicons/react/solid'
import Panel from '../../components/Panel'
import { NextPage } from 'next'
import SettingsPageLayout from '../../components/SettingsPageLayout'
import {
  withRequiredUser,
  WithRequiredUserPage,
} from '../../components/withUser'

const Order: WithRequiredUserPage = () => {
  const testOrganization = {
    id: 'abcdefg',
    createdDate: '',
    updatedDate: '',
    name: 'My Organization',
    description: 'The Best Running Events In Town',
    uri: 'my-organization',
    logo: 'http://localhost:9199/v0/b/firebasestoragebucket/o/organization-logo%2F159e7070-c3a3-42b8-a51f-d8463067fb0d?alt=media&token=ddc759ae-a862-4f64-9679-a3646ddc2aa9',
    banner:
      'http://localhost:9199/v0/b/firebasestoragebucket/o/organization-banner%2Fb1acaad9-71e9-41f9-bb67-20dedcca4b39?alt=media&token=ea2d8166-4270-4b08-9d3d-94fabbf84761',
    photoCount: 26,
  }

  const testPhotos = [
    {
      id: 'photo291',
      previewImageUrl: 'https://picsum.photos/200',
      sourceImageUrl: 'https://picsum.photos/200',
      bibNumbers: [],
      price: 0,
    },
    {
      id: 'photo292',
      previewImageUrl: 'https://picsum.photos/200',
      sourceImageUrl: 'https://picsum.photos/200',
      bibNumbers: [],
      price: 0,
    },
    {
      id: 'photo293',
      previewImageUrl: 'https://picsum.photos/200',
      sourceImageUrl: 'https://picsum.photos/200',
      bibNumbers: [],
      price: 0,
    },
    {
      id: 'photo294',
      previewImageUrl: 'https://picsum.photos/200',
      sourceImageUrl: 'https://picsum.photos/200',
      bibNumbers: [],
      price: 0,
    },
  ]

  return (
    <SettingsPageLayout
      name="Order details"
      breadbrumbNavigation={
        <BreadcrumbMenu
          links={[
            {
              text: 'My account',
              url: '/account',
            },
            {
              text: 'My orders',
              url: '/orders',
            },
            {
              text: 'Order details',
              url: '/order',
            },
          ]}
        />
      }
    >
      <Panel>
        <div className="flex flex-col items-start sm:flex-row sm:justify-between">
          <div className="flex flex-col text-sm">
            <p className="font-medium text-gray-400">Client information</p>
            <p className="font-bold">Victor Cheeney</p>
            <p className="font-bold">123 rue Dubord</p>
            <p className="font-bold">Sherbrooke, QC</p>
            <p className="font-bold">Q1W 2E3</p>
          </div>
          <div className="flex flex-col mt-2 sm:items-end sm:mt-0">
            <OrderDetailsInformationLine title="Organization">
              <Link href={`/${testOrganization.uri}`}>
                <div className="flex items-center space-x-2 cursor-pointer hover:text-primary-500 hover:underline">
                  <span className="font-bold uppercase">
                    {testOrganization.name}
                  </span>
                  <img
                    src={`${testOrganization.logo}`}
                    className="w-5 h-5 rounded"
                  />
                </div>
              </Link>
            </OrderDetailsInformationLine>
            <OrderDetailsInformationLine title="Order ID">
              <span className="font-bold">701-6834259-3622665</span>
            </OrderDetailsInformationLine>
            <OrderDetailsInformationLine title="Purchase date">
              <span className="font-bold">September 26th 2021</span>
            </OrderDetailsInformationLine>
            <OrderDetailsInformationLine title="Payment method">
              <span className="font-bold">MASTERCARD ***** 1234</span>
            </OrderDetailsInformationLine>
            <OrderDetailsInformationLine title="Total">
              <span className="font-bold">30.00$</span>
            </OrderDetailsInformationLine>
          </div>
        </div>
      </Panel>
      <Panel>
        <p className="mb-4 text-sm font-medium text-gray-400">3 PHOTOS</p>
        <div className="grid gap-4 mb-4 sm:grid-cols-2">
          {testPhotos.slice(1, 4).map((photo) => (
            <div className="flex justify-between space-x-4" key={photo.id}>
              <div className="flex space-x-2">
                <img
                  src={`${photo.previewImageUrl}`}
                  alt={photo.id}
                  className="object-cover object-center w-20 h-20 rounded shadow"
                />
                <div className="flex flex-col overflow-hidden">
                  <p className="overflow-hidden text-sm text-gray-500 whitespace-nowrap overflow-ellipsis">
                    Bib numbers: {['82', '83', '96'].join(', ')}
                  </p>
                  <p className="text-sm text-gray-500">
                    Price:{' '}
                    {photo.price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'CAD',
                    })}
                  </p>
                  <div className="flex items-end flex-grow">
                    <button className="flex items-center px-2 py-1 space-x-2 text-gray-600 bg-white border rounded-lg shadow px-2font-semibold hover:bg-gray-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center"></div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center pt-4 space-x-2 border-t-2 border-gray-200">
          <div>
            <button className="flex items-center px-4 py-2 space-x-4 text-sm font-bold tracking-wider uppercase border border-none rounded-lg shadow text-primary-50 bg-primary-500 px-2font-semibold hover:bg-primary-400">
              <FolderDownloadIcon className="w-4 h-4" />
              <span>Download all</span>
            </button>
          </div>
        </div>
      </Panel>
    </SettingsPageLayout>
  )
}

export default withRequiredUser(Order)
