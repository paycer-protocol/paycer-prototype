import React, { useState } from 'react'
import classnames from 'classnames'
import { Trans } from '@lingui/macro'
import { ButtonVariant } from 'react-bootstrap/types'
import Button from '@components/atoms/button'
import { FormattedNumber } from '@components/atoms/number'
import useWallet from '@hooks/use-wallet'
import WalletProvider from '../web3/wallet-provider'
import WalletDetail from './wallet-detail'
import { connectors } from '@providers/connectors'
import { normalizeFilename } from '../../../helper/filename'

export interface AccountProps {
    buttonVariant?: ButtonVariant
    dropdownVariant?: ButtonVariant
    className?: string
    onClick?: () => void
}

const WalletConnect = (props: AccountProps) => {
    const {
      buttonVariant = 'outline-primary',
      dropdownVariant = 'outline-primary',
      className,
    } = props

    const [showWalletProviderModal, setShowWalletProviderModal] = useState(false)
    const [showAccountModal, setShowAccountModal] = useState(false)
    const wallet = useWallet()

    if (!wallet.isConnected) {
        return (
            <>
                <Button
                    className={classnames(className, 'px-4 text-nowrap p-2 bg-dark pt-3 pb-3 border-0 text-light')}
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
                className={classnames(className, 'd-flex align-items-center justify-content-center bg-dark border-0 text-light')}
                onClick={() => setShowAccountModal(true)}
            >
              <div className="me-3">
                <div className="d-flex">
                    <img width="20" className="ms-1" src={`assets/icons/${normalizeFilename(wallet.etherSymbol)}.svg`} alt={wallet.etherSymbol} />
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
