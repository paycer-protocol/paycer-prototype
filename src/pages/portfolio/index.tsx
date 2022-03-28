import React from 'react'
import {Trans} from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import PortalBlockNumber from '@components/organisms/portal-block-number'
import Portfolio from '@components/organisms/portfolio'
import useWallet from "@hooks/use-wallet";
import LoginCard from "@components/organisms/login-card";

export default function PortfolioPage() {

    const { isConnected } = useWallet()

    return (
        <>
            <div className="container mt-3 mb-8">
                <PageHeader>
                    <div className="row align-items-center">
                        <div className="col">
                            <PageHeader.Subtitle>
                                <Trans>Overview</Trans>
                            </PageHeader.Subtitle>
                            <PageHeader.Title>
                                <Trans>Portfolio</Trans>
                            </PageHeader.Title>
                        </div>
                    </div>
                </PageHeader>
                {isConnected ? <Portfolio/> :  <LoginCard /> }
                <PortalBlockNumber/>
            </div>
        </>
    )
}

