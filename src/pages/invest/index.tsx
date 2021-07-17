import React, { useState } from 'react'
import Link from 'next/link'
import PageHeader from '@components/molecules/page-header'
import Button from '@components/atoms/button'
import InvestCard from '@components/organisms/invest/invest-card'
import WalletProvider from '@components/organisms/web3/wallet-provider'
import { connectors } from '@components/organisms/web3/providers'
import { investmentStrategies }from '@config/investment/strategies'

export default function Invest() {
    const [showWalletProviderModal, setShowWalletProviderModal] = useState(false)

    return (
        <div className="container mt-3">
            <PageHeader>
                <div className="row align-items-center">
                    <div className="col">
                        <PageHeader.Subtitle>Overview</PageHeader.Subtitle>
                        <PageHeader.Title>Invest</PageHeader.Title>
                    </div>
                    <div className="col-auto">
                        <Link href="/invest/create">
                            <Button variant="outline-primary">
                                Create investment
                            </Button>
                        </Link>
                    </div>
                </div>
            </PageHeader>
            <div className="row">
                {investmentStrategies.map((data, key) => (
                    <div key={key} className="col-12 col-md-6 col-lg-4">
                        <InvestCard
                            { ...data }
                            setShowWalletProviderModal={setShowWalletProviderModal}
                        />
                    </div>
                ))}
            </div>
            <WalletProvider
                providers={connectors}
                onHide={() => setShowWalletProviderModal(false)}
                show={showWalletProviderModal}
            />
        </div>
    )
}
