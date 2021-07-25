import React, { useState } from 'react'
import Link from 'next/link'
import { Trans } from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import Button from '@components/atoms/button'
import WalletProvider from '@components/organisms/web3/wallet-provider'
import { connectors } from '@components/organisms/web3/providers'
import { investmentStrategies }from '@config/investment/strategies'
import SearchList from "@components/organisms/search-list";

export default function Invest() {
    const [showWalletProviderModal, setShowWalletProviderModal] = useState(false)

    return (
        <div className="container mt-3">
            <PageHeader>
                <div className="row align-items-center">
                    <div className="col">
                        <PageHeader.Subtitle>
                            <Trans>Overview</Trans>
                        </PageHeader.Subtitle>
                        <PageHeader.Title>
                            <Trans>Invest</Trans>
                        </PageHeader.Title>
                    </div>
                    <div className="col-auto">
                        <Link href="/invest/create">
                            <Button variant="outline-primary">
                                <Trans>Create investment</Trans>
                            </Button>
                        </Link>
                    </div>
                </div>
            </PageHeader>
            <div className="row">
                <div className="col">
                    <SearchList items={investmentStrategies} />
                </div>
            </div>
            <WalletProvider
                providers={connectors}
                onHide={() => setShowWalletProviderModal(false)}
                show={showWalletProviderModal}
            />
        </div>
    )
}
