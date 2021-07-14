import React, { useState } from 'react'
import styled from 'styled-components'
import { ButtonVariant } from 'react-bootstrap/types'
import Button from '@components/atoms/button'
import useWallet from './hooks/useWallet'
import Icon from '@components/atoms/icon'
import NativeCurrencyIcon  from './native-currency-icon'

export interface NetworkProps {
    buttonVariant?: ButtonVariant
    dropdownVariant?: ButtonVariant
}

const Network = (props: NetworkProps) => {
    const [showNetworkModal, setShowNetworkModal] = useState(false)
    const wallet = useWallet()

    if (!wallet.isConnected) {
        return null
    }

    return (
        <>
            <Button
                variant="light"
                className="d-flex align-items-center justify-content-center p-2 bg-dark"
                onClick={() => setShowNetworkModal(true)}
            >
                <span className="mx-2 me-3">{wallet.chainName}</span>
                <div className="bg-dark-soft rounded-2 p-3 pt-2 pb-2">
                    <NativeCurrencyIcon size={20} />
                </div>

            </Button>
        </>
    )
}

export default Network
