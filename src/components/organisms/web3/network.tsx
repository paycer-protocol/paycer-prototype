import React, { useState } from 'react'
import classnames from 'classnames'
import Button from '@components/atoms/button'
import useWallet from '@hooks/use-wallet'
import NativeCurrencyIcon  from './native-currency-icon'
import NetworkProvider  from './network-provider'
import { mainNetProviders } from '@providers/networks'

const Network = (props) => {
  const [showNetworkModal, setShowNetworkModal] = useState(false)
  const wallet = useWallet()

  if (!wallet.isConnected) {
    return null
  }

  return (
    <>
      <Button
        variant="light"
        className={classnames('d-flex align-items-center justify-content-center bg-dark border-0 text-light', props.className)}
        onClick={() => setShowNetworkModal(true)}
      >
        <span className="mx-2 pt-1 pb-1">{wallet.chainName}</span>
      </Button>
      <NetworkProvider
        providers={mainNetProviders}
        show={showNetworkModal}
        onHide={() => setShowNetworkModal(false)}
      />
    </>
  )
}

export default Network
