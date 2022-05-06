import React, { useState } from 'react'
import {t, Trans} from '@lingui/macro'
import { useWeb3Auth } from '@context/web3-auth-context'
import GradientButton from '@components/atoms/button/gradient-button'
import WalletProvider from '@components/organisms/web3/wallet-provider'
import { connectors } from '@providers/connectors'

const LoginCard = () => {
    const { walletIsAuthenticated } = useWeb3Auth()
    const [showWalletProviderModal, setShowWalletProviderModal] = useState(false)

    if (walletIsAuthenticated) {
        return null
    }

    return (
        <div className="card">
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

export default LoginCard

