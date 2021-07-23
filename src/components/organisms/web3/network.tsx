import React, { useState } from 'react'
import classnames from 'classnames'
import Button from '@components/atoms/button'
import useWallet from './hooks/useWallet'
import NativeCurrencyIcon  from './native-currency-icon'
import NetworkProvider  from './network-provider'
import { mainNetProviders } from './providers/networks'
import {normalizeFilename} from "../../../helper/filename";

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
                className={classnames('d-flex align-items-center justify-content-center bg-dark', props.className)}
                onClick={() => setShowNetworkModal(true)}
            >
                <span className="mx-2">{wallet.chainName}</span>
                <div className="bg-dark-soft rounded-2 p-2 p-3 pt-2 pb-2">
                    <img width="28" className="me-2" src={`assets/icons/${normalizeFilename(wallet.chainName)}.svg`} alt={wallet.chainName} />
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
