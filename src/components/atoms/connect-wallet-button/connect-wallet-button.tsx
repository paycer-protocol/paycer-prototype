import GradientButton from "@components/atoms/button/gradient-button"
import { Trans } from '@lingui/macro'
import { connectors } from '@providers/connectors'
import { useState } from 'react'
import WalletProvider from '../../organisms/web3/wallet-provider'

const ConnectWalletButton = () => {
    const [showWalletProviderModal, setShowWalletProviderModal] = useState(false)

    return (
        <>
            <GradientButton
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
        </>
    )
}

export default ConnectWalletButton