import React, { useState } from 'react'
import Button from '@components/atoms/button'
import useWallet from './hooks/useWallet'
import NativeCurrencyIcon  from './native-currency-icon'
import NetworkProvider  from './network-provider'
import { mainNetProviders } from './providers/networks'

const Network = () => {
    const [showNetworkModal, setShowNetworkModal] = useState(false)
    const wallet = useWallet()

    if (!wallet.isConnected) {
        return null
    }

    return (
        <>
            <Button
                variant="light"
                className="d-flex align-items-center justify-content-center p-0 p-md-2 bg-dark"
                onClick={() => setShowNetworkModal(true)}
            >
                <span className="mx-2 me-3 d-none d-md-block">{wallet.chainName}</span>
                <div className="bg-dark-soft rounded-2 p-2 p-md-3 pt-md-2 pb-md-2">
                    <NativeCurrencyIcon size={20} />
                </div>

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
