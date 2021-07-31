import React, { useState } from 'react'
import Link from 'next/link'
import { Trans } from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import Button from '@components/atoms/button'
import WalletProvider from '@components/organisms/web3/wallet-provider'
import InvestList from '@components/organisms/invest/invest-list/invest-list'
import InvestListProvider from '../../context/invest-list-context'
import { connectors } from '@providers/connectors'

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
                </div>
            </PageHeader>
            <div className="row">
                <div className="col">
                    <InvestListProvider>
                        <InvestList />
                    </InvestListProvider>
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
