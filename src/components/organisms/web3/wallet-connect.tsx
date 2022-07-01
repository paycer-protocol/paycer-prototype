import React, { useState } from 'react'
import classnames from 'classnames'
import { t } from '@lingui/macro'
import Button from '@components/atoms/button'
import { useDapp } from '@context/dapp-context'
import { connectors } from '@providers/connectors'
import WalletProvider from './wallet-provider'
import WalletDetail from './wallet-detail'

export interface WalletConnectProps {
  className?: string
}

const WalletConnect = (props: WalletConnectProps) => {
  const { className } = props
  const [showWalletProviderModal, setShowWalletProviderModal] = useState(false)
  const [showAccountModal, setShowAccountModal] = useState(false)
  const { isAuthenticated, walletShortenAddress } = useDapp()

  if (!isAuthenticated) {
    return (
      <>
        <Button
          className={classnames(className, 'px-4 text-nowrap p-2 pt-3 pb-3 text-light')}
          onClick={() => setShowWalletProviderModal(true)}
        >
          {t`Connect to a Wallet`}
        </Button>
        {(showWalletProviderModal
                  && (
                  <WalletProvider
                    providers={connectors}
                    onHide={() => setShowWalletProviderModal(false)}
                  />
                  )
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
          {walletShortenAddress}
        </div>
      </Button>
      <WalletDetail
        onHide={() => setShowAccountModal(false)}
        show={showAccountModal}
        setShowWalletProviderModal={setShowWalletProviderModal}
      />
      {(showWalletProviderModal
              && (
              <WalletProvider
                providers={connectors}
                onHide={() => setShowWalletProviderModal(false)}
              />
              )
            )}
    </>
  )
}

export default WalletConnect
