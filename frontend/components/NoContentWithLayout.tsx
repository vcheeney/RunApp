import React, { FC } from 'react'
import Layout from './Layout'
import NoContent from './NoContent'

type Props = {
  text?: string
}

const NoContentWithLayout: FC<Props> = ({ text }) => {
  return (
    <Layout>
      <div className="flex items-center justify-center h-full">
        <NoContent text={text} />
      </div>
    </Layout>
  )
}

export default NoContentWithLayout
