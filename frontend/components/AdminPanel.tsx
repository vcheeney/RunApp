import React, { FC } from 'react'

type Props = {
  title: string
  resourceName: string
  breadbrumbNavigation: JSX.Element
}

const AdminPanel: FC<Props> = ({ title, children, breadbrumbNavigation }) => {
  return (
    <div className="p-4 space-y-4">
      <div>
        {breadbrumbNavigation}
        <h2 className="text-2xl font-medium sm:text-3xl">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default AdminPanel
