import React, { useState } from 'react'
import classnames from 'classnames'
import { Trans } from '@lingui/macro'
import Button from '@components/atoms/button'
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
                    className={classnames(className, 'px-4 text-nowrap p-2 pt-3 pb-3 text-light')}
                    onClick={() => setShowWalletProviderModal(true)}
                >
                    <Trans>Connect to a Wallet</Trans>
                </Button>
                {(showWalletProviderModal &&
                  <WalletProvider
                    providers={connectors}
                    onHide={() => setShowWalletProviderModal(false)}
                  />
                )}
            </>
        )
    }

    return (
        <>
            <Button
                className={classnames(className, 'd-flex align-items-center justify-content-center bg-dark text-light bg-primary')}
                onClick={() => setShowAccountModal(true)}
            >
                <div className="mx-2 me-2">
                    {wallet.shortenAddress}
                </div>
            </Button>
            <WalletDetail
                onHide={() => setShowAccountModal(false)}
                show={showAccountModal}
                setShowWalletProviderModal={setShowWalletProviderModal}
            />
            {(showWalletProviderModal &&
              <WalletProvider
                providers={connectors}
                onHide={() => setShowWalletProviderModal(false)}
              />
            )}
        </>
    )
}

export default WalletConnect
