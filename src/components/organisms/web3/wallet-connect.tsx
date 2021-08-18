import React, { useState } from 'react'
import classnames from 'classnames'
import { Trans } from '@lingui/macro'
import Button from '@components/atoms/button'
import CurrencyIcon from '@components/atoms/currency-icon'
import { FormattedNumber } from '@components/atoms/number'
import useWallet from '@hooks/use-wallet'
import WalletProvider from '../web3/wallet-provider'
import WalletDetail from './wallet-detail'
import { connectors } from '@providers/connectors'

export interface WalletConnectProps {
    className?: string
}

const WalletConnect = (props: WalletConnectProps) => {
    const { className } = props
    const [showWalletProviderModal, setShowWalletProviderModal] = useState(false)
    const [showAccountModal, setShowAccountModal] = useState(false)
    const wallet = useWallet()

    if (!wallet.isConnected) {
        return (
            <>
                <Button
                    className={classnames(className, 'px-4 text-nowrap p-2 bg-dark pt-3 pb-3 text-light')}
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
                className={classnames(className, 'd-flex align-items-center justify-content-center bg-dark text-light')}
                onClick={() => setShowAccountModal(true)}
            >
                <div className="me-3">
                    <div className="d-flex">
                        <CurrencyIcon className="ms-1" symbol="eth" />
                        <div className="pt-1 pb-1 mx-2">
                            <FormattedNumber
                                value={wallet.etherBalance}
                                minimumFractionDigits={2}
                                maximumFractionDigits={4}
                            />
                        </div>
                    </div>
                </div>
                <div className="me-2 ms-2">
                    {wallet.shortenAddress}
                </div>
            </Button>
            <WalletDetail
                onHide={() => setShowAccountModal(false)}
                show={showAccountModal}
                setShowWalletProviderModal={setShowWalletProviderModal}
            />
            <WalletProvider
                providers={connectors}
                onHide={() => setShowWalletProviderModal(false)}
                show={showWalletProviderModal}
            />
        </>
    )
}

export default WalletConnect
