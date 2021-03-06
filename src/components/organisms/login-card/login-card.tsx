import React, { useState } from 'react'
import {t, Trans} from '@lingui/macro'
import { useDapp } from '@context/dapp-context'
import GradientButton from '@components/atoms/button/gradient-button'
import WalletProvider from '@components/organisms/web3/wallet-provider'
import { connectors } from '@providers/connectors'

const LoginCard = () => {
    const [showWalletProviderModal, setShowWalletProviderModal] = useState(false)

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
                        {t`Connect to a Wallet`}
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

