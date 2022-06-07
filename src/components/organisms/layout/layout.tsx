import React from 'react'
import Header from '@components/organisms/header'
import Footer from '@components/organisms/footer'
import { useDapp } from '@context/dapp-context'
import Spinner from "@components/atoms/spinner";
import { t } from '@lingui/macro'

export interface LayoutProps {
  children: any
}

const Layout = (props: LayoutProps) => {
  const { children } = props
  const { currentChainIsSupportedForDApp, isWeb3EnableLoading } = useDapp()

  if (currentChainIsSupportedForDApp) {
      return (
          <>
              <div className="mb-md-5">
                  <Header/>
              </div>
              <main role="main" className="mb-8">
                  {children}
              </main>
              <Footer />
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
      <main role="main" className="mb-8">
        <div className="d-flex flex-column align-items-center justify-content-center mt-8">
            {/*@ts-ignore*/}
            <h1>{t`Network not supported`}</h1>
            {/*@ts-ignore*/}
            {t`Change network`}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Layout