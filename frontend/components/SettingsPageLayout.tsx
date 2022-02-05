import React, { FC } from 'react'
import Container from './Container'
import ElevatedBar from './ElevatedBar'
import Layout from './Layout'

type Props = {
  breadbrumbNavigation: JSX.Element
  name: string
  actions?: JSX.Element
}

const SettingsPageLayout: FC<Props> = ({
  name,
  children,
  breadbrumbNavigation,
  actions,
}) => {
  return (
    <Layout>
      <ElevatedBar>
        <Container className="py-4" contentSize="medium" paddingBottom={false}>
          {breadbrumbNavigation}
        </Container>
      </ElevatedBar>
      <Container contentSize="medium">
        <div className="max-w-4xl mx-auto">
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xl sm:text-2xl">{name}</p>
              {actions}
            </div>
            <hr />
            {children}
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export default SettingsPageLayout
