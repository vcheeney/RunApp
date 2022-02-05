import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import React, { FC } from 'react'
import AdminButton, { AdminAddButton, AdminEditButton } from './AdminButton'

type Props = {
  title: string
  icon: JSX.Element
  actionItems: JSX.Element
}

const AdminButtonDisclosure: FC<Props> = ({ title, icon, actionItems }) => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="w-full">
            <AdminButton title={title} icon={icon} foldable open={open} />
          </Disclosure.Button>
          <Disclosure.Panel className="pl-4">{actionItems}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default AdminButtonDisclosure
