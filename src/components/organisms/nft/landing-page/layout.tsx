import React from 'react'
import NftPageHeader, {NftPageHeaderProps} from '@components/organisms/nft-page-header'
import Footer from '@components/organisms/footer'
import Network from '@components/organisms/web3/network'
import useNetwork from '@hooks/use-network'
import {t} from '@lingui/macro'

export interface NftLandingPageLayoutProps {
    sections?: NftPageHeaderProps['sections']
    children: any
}

const NftLandingPageLayout = (props: NftLandingPageLayoutProps) => {
    const {children} = props
    const network = useNetwork()

    if (network.supportedChain) {
        return (
            <>
                <NftPageHeader
                    sections={props.sections}
                />
                <main role="main" style={{paddingTop: '124px'}}>
                    {children}
                </main>
                <Footer/>
            </>
        )
    }

    return (
        <>
            <NftPageHeader sections={[]}/>
            <main role="main" style={{paddingTop: '124px'}}>
                <div className="d-flex flex-column align-items-center justify-content-center mt-8">
                    <Network>
                        <h1>{t`Network not supported`}</h1>
                        {t`Change network`}
                    </Network>
                </div>
            </main>
            <Footer/>
        </>
    )

}

export default NftLandingPageLayout

