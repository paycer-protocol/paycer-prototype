import React from 'react'
import {t} from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import PortalBlockNumber from '@components/organisms/portal-block-number'
import Portfolio from '@components/organisms/portfolio'
import useWallet from "@hooks/use-wallet";
import LoginCard from "@components/organisms/login-card";
import Layout from '@components/organisms/layout'

export default function PortfolioPage() {

    const { isConnected } = useWallet()

    return (
        <Layout>
            <div className="container mt-3 mb-8">
                <PageHeader>
                    <div className="row align-items-center">
                        <div className="col">
                            <PageHeader.Subtitle>
                                {t`Overview`}
                            </PageHeader.Subtitle>
                            <PageHeader.Title>
                                {t`Portfolio`}
                            </PageHeader.Title>
                        </div>
                    </div>
                </PageHeader>
                {isConnected ? <Portfolio/> :  <LoginCard /> }
                <PortalBlockNumber/>
            </div>
        </Layout>
    )
}

