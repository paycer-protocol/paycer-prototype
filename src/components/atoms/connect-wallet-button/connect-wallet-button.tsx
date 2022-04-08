import GradientButton from "@components/atoms/button/gradient-button"
import {t} from '@lingui/macro'
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
                {t`Connect to a Wallet`}
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