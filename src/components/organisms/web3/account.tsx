import React, { useState } from 'react'
import { Trans } from '@lingui/macro'
import { ButtonVariant } from 'react-bootstrap/types'
import Button from '@components/atoms/button'
import { FormattedNumber } from '@components/atoms/number'
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
                    className="px-4 text-nowrap p-2 bg-dark pt-3 pb-3"
                    onClick={() => setShowWalletProviderModal(true)}
                >
                    <Trans>Connect to a Wallet</Trans>
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
                className="d-flex align-items-center justify-content-center p-0 p-md-2 bg-dark "
                onClick={() => setShowAccountModal(true)}
            >
              <div className="p-2">
                <FormattedNumber value={wallet?.etherBalance} />&nbsp;{wallet?.etherSymbol}
              </div>
                <div className="bg-dark-soft rounded-2 p-3 pt-2 pb-2 d-none d-md-block">
                    {wallet.shortenAddress}
                </div>
            </Button>
            <AccountDetail
                onHide={() => setShowAccountModal(false)}
                show={showAccountModal}
            />
        </>
    )
}

export default Account
