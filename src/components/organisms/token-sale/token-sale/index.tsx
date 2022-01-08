import useTokenSale from '@hooks/use-token-sale'
import { TokenSaleDashboardProvider } from '@context/token-sale-dashboard-context'
import React, { useState } from 'react'
import Spinner from '@components/atoms/spinner'
import {t, Trans} from '@lingui/macro'
import GradientButton from '@components/atoms/button/gradient-button'
import WalletProvider from '@components/organisms/web3/wallet-provider'
import { connectors } from '@providers/connectors'
import Dashboard from '../dashboard'

const TokenSale = () => {
    const {
        tokenSaleData,
        loading,
    } = useTokenSale()

    const [showWalletProviderModal, setShowWalletProviderModal] = useState(false)

    if (loading) {
        return (
            <div className="card bg-transparent border-0 blur-background">
                <div className="bg-transparent d-flex justify-content-center align-items-center">
                    <Spinner animation="border" show />
                </div>
            </div>
        )
    }

    if (tokenSaleData && tokenSaleData.length) {
        return (
            <>
                {tokenSaleData.map((dashboardData, index) => (
                    <TokenSaleDashboardProvider dashboardData={dashboardData}>
                        <div className={index +1 !== tokenSaleData.length ? 'mb-6' : ''}>
                            <Dashboard />
                        </div>
                    </TokenSaleDashboardProvider>
                ))}
            </>
        )
    }

    return (
        <div className="card blur-background">
            <div className="card-body">
                <h2 className="mb-0 text-center">
                    {t`No investment found for this wallet. Please connect another wallet address.`}
                </h2>
                <div className="w-25 mx-auto mt-4">
                    <GradientButton
                        type="submit"
                        title={t`Claim`}
                        className="px-5 w-100"
                        onClick={() => setShowWalletProviderModal(true)}
                    >
                        <Trans>Connect to a Wallet</Trans>
                    </GradientButton>
                    <WalletProvider
                        providers={connectors}
                        onHide={() => setShowWalletProviderModal(false)}
                        show={showWalletProviderModal}
                    />
                </div>
            </div>
        </div>
    )
}

export default TokenSale