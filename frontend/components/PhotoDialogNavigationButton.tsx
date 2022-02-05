import React, { FC } from 'react'

type Props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  Icon: (props: React.ComponentProps<'svg'>) => JSX.Element
  className?: string
  circle?: boolean
  circleOnHover?: boolean
}

const PhotoDialogNavigationButton: FC<Props> = ({
  onClick,
  Icon,
  className = '',
  circle = true,
  circleOnHover = true,
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`text-white rounded-full bg-pure-gray-66 px-3 py-3 ${
        circle ? 'bg-opacity-50' : 'bg-opacity-0'
      } ${circleOnHover ? 'hover:bg-opacity-70' : ''} ${className}`}
    >
      <Icon className="w-8 h-8" />
    </button>
  )
}

export default PhotoDialogNavigationButton
