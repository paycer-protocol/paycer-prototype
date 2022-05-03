import React from 'react'
import OnePagerHeader, { OnePagerHeaderProps } from '@components/organisms/one-pager-header'
import Footer from '@components/organisms/footer'
import Network from '@components/organisms/web3/network'
import useNetwork from '@hooks/use-network'
import { Trans } from '@lingui/macro'

export interface NftLandingPageLayoutProps {
  sections: OnePagerHeaderProps['sections']
  children: any
}

const NftLandingPageLayout = (props: NftLandingPageLayoutProps) => {
  const { children } = props
  const network = useNetwork()

  if (network.supportedChain) {
    return (
      <>
        <OnePagerHeader
          sections={props.sections}
        />
        <main role="main">
          {children}
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <OnePagerHeader sections={[]} />
      <main role="main">
        <div className="d-flex flex-column align-items-center justify-content-center mt-8">
          <Network>
            <h1><Trans>Network not supported</Trans></h1>
            <Trans>Change network</Trans>
          </Network>
        </div>
      </main>
      <Footer />
    </>
  )

}

export default NftLandingPageLayout

