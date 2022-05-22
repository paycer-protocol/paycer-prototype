import React from 'react'
import Header from '@components/organisms/header'
import { useDapp } from '@context/dapp-context'
import Spinner from "@components/atoms/spinner";
import { Trans } from '@lingui/macro'

export interface LayoutProps {
  children: any
}

const Layout = (props: LayoutProps) => {
  const { children } = props
  const { currentChainIsSupportedForDApp, isWeb3EnableLoading } = useDapp()

    console.log(currentChainIsSupportedForDApp, 'currentChainIsSupportedForDApp')

  if (currentChainIsSupportedForDApp) {
    return (
      <>
        <Header />
        <main role="main">
          {children}
        </main>
      </>
    )
  }

  if (isWeb3EnableLoading) {
      return (
          <div className="d-flex flex-column align-items-center justify-content-center mt-8">
              <Spinner animation="border" show />
          </div>
      )
  }

  return (
    <>
      <Header />
      <main role="main">
        <div className="d-flex flex-column align-items-center justify-content-center mt-8">
            <h1><Trans>Network not supported</Trans></h1>
            <Trans>Change network</Trans>
        </div>
      </main>
    </>
  )

}

export default Layout
