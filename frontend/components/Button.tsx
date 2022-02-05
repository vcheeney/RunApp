import React, { FC } from 'react'

export type ButtonVariant = 'primary' | 'normal' | 'text' | 'accent'
export type ButtonSize = 'full' | 'normal' | 'large'

export type ButtonOptions = {
  disabled?: boolean
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

export const getButtonStyles = ({
  disabled = false,
  variant = 'normal',
  size = 'normal',
  className = '',
}: ButtonOptions) => {
  const colors: Record<ButtonVariant, string> = {
    normal: `bg-white text-gray-600 ${
      disabled
        ? 'bg-gray-50 text-gray-300'
        : 'hover:bg-gray-200 active:bg-gray-300'
    }`,
    primary: `bg-primary-500 text-white ${
      disabled
        ? 'bg-gray-200 text-gray-300'
        : 'hover:bg-primary-400 active:bg-primary-500'
    }`,
    accent: `bg-primary-900 text-white ${
      disabled
        ? 'bg-gray-200 text-gray-300'
        : 'hover:bg-primary-700 active:bg-primary-900'
    }`,
    text: `text-gray-600 ${disabled ? 'text-gray-300' : ''}`,
  }

  const sizes: Record<ButtonSize, string> = {
    normal: 'px-2 py-1 inline-block',
    full: 'w-full px-4 py-2 block',
    large: 'px-4 py-2 text-lg inline-block',
  }

  const defaultBorders = 'border rounded-lg shadow'

  const borders: Record<ButtonVariant, string> = {
    normal: defaultBorders,
    primary: 'border-black rounded-lg shadow',
    accent: defaultBorders,
    text: '',
  }

  return `font-semibold ${borders[variant]} ${sizes[size]} ${colors[variant]} ${
    disabled ? 'cursor-default' : 'cursor-pointer'
  } ${className}`
}

type Props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type?: 'submit' | 'reset' | 'button' | undefined
  disabled?: boolean
  text?: string
  Icon?: (props: React.ComponentProps<'svg'>) => JSX.Element
  variant?: ButtonVariant
  size?: ButtonSize
  uppercase?: boolean
  className?: string
}

const Button: FC<Props> = ({
  onClick,
  type,
  disabled = false,
  text,
  Icon,
  variant = 'normal',
  size,
  uppercase = false,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={getButtonStyles({ disabled, variant, size, className })}
    >
      <div className="flex items-center justify-center space-x-2">
        {Icon && <Icon className="w-5 h-5" />}
        {text && (
          <span className={uppercase ? 'uppercase tracking-wide' : ''}>
            {text}
          </span>
        )}
      </div>
    </button>
  )
}

export default Button
