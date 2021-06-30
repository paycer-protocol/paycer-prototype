import React, { useState } from 'react'
import { ButtonVariant } from 'react-bootstrap/types'
import Button from '@components/atoms/button'
import useWallet from './hooks/useWallet'
import WalletProvider from '../web3/wallet-provider'
import AccountDetail from './account-detail'
import { connectors } from './providers'

export interface AccountProps {
    buttonVariant?: ButtonVariant
    dropdownVariant?: ButtonVariant
}

const Account = (props: AccountProps) => {
    const { buttonVariant = 'outline-primary', dropdownVariant = 'outline-primary' } = props
    const [showWalletProviderModal, setShowWalletProviderModal] = useState(false)
    const [showAccountModal, setShowAccountModal] = useState(false)
    const wallet = useWallet()

    if (!wallet.isConnected) {
        return (
            <>
                <Button
                    variant={buttonVariant}
                    className="px-4 text-nowrap"
                    onClick={() => setShowWalletProviderModal(true)}
                >
                    Connect to a Wallet
                </Button>
                <WalletProvider
                    providers={connectors}
                    onHide={() => setShowWalletProviderModal(false)}
                    show={showWalletProviderModal}
                />
            </>

        )
    }

    return (
        <>
            <Button
                variant={dropdownVariant}
                className="d-flex align-items-center justify-content-center"
                onClick={() => setShowAccountModal(true)}
            >
                {wallet.shortenAddress}
            </Button>
            <AccountDetail
                onHide={() => setShowAccountModal(false)}
                show={showAccountModal}
            />
        </>
    )
}

export default Account
