import React from 'react'
import Header from '@components/organisms/header'
import useNetwork from '@hooks/use-network'
import Spinner from "@components/atoms/spinner";

export interface LayoutProps {
  children: any
}

const Layout = (props: LayoutProps) => {
  const { children } = props
  const network = useNetwork()

  if (network.currentChainIsSupportedForDApp) {
    return (
      <>
        <Header />
        <main role="main">
          {children}
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main role="main">
        <div className="d-flex flex-column align-items-center justify-content-center mt-8">
            <Spinner animation="border" show />
        </div>
      </main>
    </>
  )

}

export default Layout
