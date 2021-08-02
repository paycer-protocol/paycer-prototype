import React from 'react'
import Header from '@components/organisms/header'
import Network from '@components/organisms/web3/network'
import useNetwork from '@hooks/use-network'
import { Trans } from '@lingui/macro'
import styled from 'styled-components'

export interface LayoutProps {
  children: any
}

const DemoBadge = styled.div`
    position: fixed;
    transform: rotate(312deg);
    right: -64px;
    bottom: 34px;
    line-height: 25px;
    font-size: 12px;
    width: 218px;
    padding-left: 3px;
    text-align: center;
    font-weight: 500;
    color: white;
    text-shadow: rgb(0 0 0) -1px 1px 7px;
    height: 28px;
    justify-content: center;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    background: linear-gradient(101deg,#733dca,#c3cef7);
    letter-spacing: 0.1px;
`

const Layout = (props: LayoutProps) => {
  const { children } = props
  const network = useNetwork()

  if (network.supportedChain) {
    return (
      <>
        <Header />
        <main role="main">
          {children}
          <DemoBadge>
            Demo
          </DemoBadge>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main role="main">

        <div className="d-flex flex-column align-items-center justify-content-center mt-8">

          <h1><Trans>Network not supported</Trans></h1>
          <Network>
            <Trans>Change network</Trans>
          </Network>
        </div>

      </main>
    </>
  )

}

export default Layout
