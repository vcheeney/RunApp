import { DesktopComputerIcon, DeviceMobileIcon } from '@heroicons/react/solid'
import React, { FC, useState } from 'react'
import { isURL } from '../utils/utils'

type PreviewMode = 'mobile' | 'desktop'

type Props = {
  previewPath: string
  iframePath: string
  values: any
}

const ResourcePreview: FC<Props> = ({ previewPath, iframePath, values }) => {
  const [previewMode, setPreviewMode] = useState<PreviewMode>('desktop')

  return (
    <div className="flex items-center justify-center h-full p-8">
      <div
        className={`p-4 space-y-2 bg-white rounded-lg shadow-sm flex flex-col flex-grow h-full ${
          previewMode === 'mobile' ? 'max-w-sm' : ''
        }`}
      >
        <div className={`flex items-center justify-between flex-grow-0`}>
          <div className="flex space-x-2">
            <span className="font-medium text-gray-600">Preview</span>
            {previewMode === 'desktop' && previewPath && (
              <>
                <span className="font-bold text-gray-300">|</span>
                <span className="text-gray-500">{previewPath}</span>
              </>
            )}
          </div>
          <div className="flex space-x-2">
            <button onClick={() => setPreviewMode('mobile')} type="button">
              <DeviceMobileIcon
                className={`w-8 h-8 p-1 text-gray-500 bg-gray-200 rounded  ${
                  previewMode === 'mobile'
                    ? 'text-primary-500'
                    : 'cursor-pointer hover:bg-gray-300 hover:text-gray-600 active:text-gray-700'
                }`}
              />
            </button>
            <button onClick={() => setPreviewMode('desktop')} type="button">
              <DesktopComputerIcon
                className={`w-8 h-8 p-1 text-gray-500 bg-gray-200 rounded  ${
                  previewMode === 'desktop'
                    ? 'text-primary-500'
                    : 'cursor-pointer hover:bg-gray-300 hover:text-gray-600 active:text-gray-700'
                }`}
              />
            </button>
          </div>
        </div>
        <div className="relative flex-grow">
          <div className="absolute inset-0 overflow-hidden bg-gray-100 border rounded-lg">
            <iframe
              key={makePreviewUrl(iframePath, values)}
              src={makePreviewUrl(iframePath, values)}
              className="w-full h-full select-none"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResourcePreview

function makePreviewUrl(path: string, values: any) {
  const queryParams = Object.entries(values)
    .map(([key, value]) =>
      isURL(value)
        ? `${key}=${encodeURIComponent(value as string)}`
        : `${key}=${value}`
    )
    .join('&')

  return `${path}?${queryParams}`
}
