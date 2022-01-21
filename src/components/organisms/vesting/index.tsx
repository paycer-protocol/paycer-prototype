import React, { useState } from 'react'
import {t, Trans} from '@lingui/macro'
import { VestingDashboardProvider } from '@context/vesting-dashboard-context'
import useTokenSale from '@hooks/use-token-sale'
import useWallet from '@hooks/use-wallet'
import Spinner from '@components/atoms/spinner'
import GradientButton from '@components/atoms/button/gradient-button'
import WalletProvider from '@components/organisms/web3/wallet-provider'
import { connectors } from '@providers/connectors'
import Dashboard from './dashboard'

const Vesting = () => {
    const wallet = useWallet()
    const { tokenSaleData, loading, } = useTokenSale()
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
                    <VestingDashboardProvider key={index} dashboardData={dashboardData}>
                        <div className={index +1 !== tokenSaleData.length ? 'mb-6' : ''}>
                            <Dashboard />
                        </div>
                    </VestingDashboardProvider>
                ))}
            </>
        )
    }

    if (wallet.isConnected && tokenSaleData && tokenSaleData.length === 0) {
        return (
          <div className="card bg-transparent border-0 blur-background">
              <div className="bg-transparent d-flex justify-content-center align-items-center">
                  <div className="card-body">
                      <h2 className="mb-0 text-center">
                          {t`You have not participated in the paycer token sale.`}
                      </h2>
                  </div>
              </div>
          </div>
        )
    }

    return (
        <div className="card blur-background">
            <div className="card-body">
                <h2 className="mb-0 text-center">
                    {t`Please connect to your wallet.`}
                </h2>
                <div className="d-flex justify-content-center align-items-center mt-4">
                    <GradientButton
                      type="submit"
                      title={t`Connect to a Wallet`}
                      className="px-5"
                      onClick={() => setShowWalletProviderModal(true)}
                    >
                        <Trans>Connect to a Wallet</Trans>
                    </GradientButton>
                    {(showWalletProviderModal &&
                      <WalletProvider
                        providers={connectors}
                        onHide={() => setShowWalletProviderModal(false)}
                      />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Vesting
