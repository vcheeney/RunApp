import { Tooltip as ChakraTooltip } from '@chakra-ui/react'
import React, { FC } from 'react'

type Props = {
  label: string
  enabled?: boolean
  boundaryContainer?: HTMLDivElement | null
}

const Tooltip: FC<Props> = ({
  label,
  enabled = true,
  boundaryContainer,
  children,
}) => {
  return (
    <ChakraTooltip
      hasArrow
      label={label}
      aria-label="A tooltip"
      className="z-50 max-w-sm p-4 text-gray-200 rounded bg-black/75"
      placement="bottom"
      isDisabled={!enabled}
      modifiers={[
        boundaryContainer
          ? {
              name: 'preventOverflow',
              enabled: true,
              options: {
                boundary: boundaryContainer,
                padding: 8,
              },
            }
          : {},
      ]}
    >
      <div>{children}</div>
    </ChakraTooltip>
  )
}

export default Tooltip
