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
                className={classnames('d-flex align-items-center justify-content-center bg-dark pt-3 pb-3', props.className)}
                onClick={() => setShowNetworkModal(true)}
            >
                <span className="mx-2">{wallet.chainName}</span>
                <img width="26" className="me-2" src={`assets/icons/${normalizeFilename(wallet.chainName)}.svg`} alt={wallet.chainName} />
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
