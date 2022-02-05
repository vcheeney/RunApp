import { ChevronDownIcon, CogIcon, PlusSmIcon } from '@heroicons/react/solid'
import React, { FC } from 'react'

type Props = {
  icon?: JSX.Element
  onClick?: () => void
  title: string
  foldable?: boolean
  open?: boolean
}

const AdminButton: FC<Props> = ({
  icon,
  title,
  onClick = () => null,
  foldable = false,
  open = true,
}) => {
  const content = (
    <>
      <div className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full">
        {icon}
      </div>
      <span className="flex-1 p-0 text-lg font-medium text-left">{title}</span>
      {foldable && (
        <div className={open ? 'transform rotate-180' : ''}>
          <ChevronDownIcon className="w-6 h-6" />
        </div>
      )}
    </>
  )
  if (foldable)
    return (
      <div className="flex items-center w-full px-2 py-2 space-x-4 cursor-pointer hover:bg-gray-100 rounded-xl">
        {content}
      </div>
    )
  return (
    <button
      className="flex items-center w-full px-2 py-2 space-x-4 cursor-pointer hover:bg-gray-100 rounded-xl"
      onClick={onClick}
    >
      {content}
    </button>
  )
}

export default AdminButton

export const AdminEditButton: FC<Props> = ({ title, onClick }) => (
  <AdminButton
    icon={<CogIcon className="w-3/4" />}
    title={title}
    onClick={onClick}
  />
)

export const AdminAddButton: FC<Props> = ({ title, onClick }) => (
  <AdminButton
    icon={<PlusSmIcon className="w-3/4" />}
    title={title}
    onClick={onClick}
  />
)
