/* eslint-disable react/display-name */
import React, { PropsWithChildren } from 'react'

type Size = 'large' | 'medium'
type PaddingMode = 'normal' | 'absent'

type Props = {
  className?: string
  paddingMode?: PaddingMode
  paddingOnSmall?: boolean
  paddingBottom?: boolean
  contentSize?: Size
  backgroundColor?: string
}

const Container = React.forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  (
    {
      className,
      children,
      paddingMode = 'normal',
      paddingOnSmall = true,
      paddingBottom = true,
      contentSize = 'large',
      backgroundColor,
    },
    ref
  ) => {
    const padding: Record<PaddingMode, string> = {
      normal: `${paddingOnSmall ? 'px-4' : ''} ${
        paddingBottom ? 'pb-4' : ''
      } md:px-4`,
      absent: '',
    }
    const classes: Record<Size, string> = {
      large: 'mx-auto max-w-7xl',
      medium: 'max-w-4xl mx-auto',
    }

    return (
      <div
        className={`${padding[paddingMode]} ${
          paddingBottom ? 'pb-4' : ''
        } ${backgroundColor}`}
        ref={ref}
      >
        <div className={`${classes[contentSize]} ${className}`}>{children}</div>
      </div>
    )
  }
)

export default Container
