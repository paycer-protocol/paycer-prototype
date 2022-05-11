import React from 'react'
import Header from '@components/organisms/header'
import Footer from '@components/organisms/footer'
import Network from '@components/organisms/web3/network'
import useNetwork from '@hooks/use-network'
import { t } from '@lingui/macro'

export interface LayoutProps {
  children: any
}

const Layout = (props: LayoutProps) => {
  const { children } = props
  const network = useNetwork()

  if (network.supportedChain) {
    return (
      <>
        <Header />
        <main role="main" className="mb-8">
          {children}
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main role="main" className="mb-8">
        <div className="d-flex flex-column align-items-center justify-content-center mt-8">
          <Network>
            <h1>{t`Network not supported`}</h1>
            {t`Change network`}
          </Network>
        </div>
      </main>
      <Footer />
    </>
  )

}

export default Layout
