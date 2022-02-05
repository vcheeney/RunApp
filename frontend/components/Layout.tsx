import React, { FC } from 'react'
import CollapsibleSideMenu from './CollapsibleSideMenu'
import Navbar from './Navbar'

type Props = {
  adminPanel?: JSX.Element | false
}

const Layout: FC<Props> = ({ children, adminPanel }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-grow">
        {adminPanel && (
          <>
            <div className="z-20 p-2 pt-4 bg-white shadow md:hidden">
              <CollapsibleSideMenu content={adminPanel} />
            </div>
            <div className="relative z-20 flex-grow-0 flex-shrink-0 hidden h-full bg-white shadow w-96 md:block">
              <div className="absolute inset-0 overflow-y-scroll">
                {adminPanel}
              </div>
            </div>
          </>
        )}
        <div className="relative flex-grow h-full">
          <div className="absolute inset-0 overflow-y-scroll">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Layout
