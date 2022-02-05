import React, { FC } from 'react'
import FullPageSpinner from './FullPageSpinner'
import Layout from './Layout'

type Props = {}

const FullPageSpinnerWithLayout: FC<Props> = ({}) => {
  return (
    <Layout>
      <FullPageSpinner />
    </Layout>
  )
}

export default FullPageSpinnerWithLayout
