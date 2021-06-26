import React, { useState } from 'react'
import { ButtonVariant } from 'react-bootstrap/types'
import Avatar, { generateAvatarSource } from '@components/atoms/avatar'
import Button from '@components/atoms/button'
import Dropdown from '@components/atoms/dropdown'
import useWallet from './hooks/useWallet'
import WalletProvider from '../web3/wallet-provider'
import { connectors } from './providers'

export interface AccountProps {
    buttonVariant?: ButtonVariant
    dropdownVariant?: ButtonVariant
}

const Account = (props: AccountProps) => {
    const { buttonVariant = 'outline-primary', dropdownVariant = 'outline-primary' } = props
    const [showModal, setShowModal] = useState(false)
    const wallet = useWallet()

    if (!wallet.isConnected) {
        return (
            <>
                <Button
                    variant={buttonVariant}
                    className="px-4 text-nowrap"
                    onClick={() => setShowModal(true)}
                >
                    Connect to a Wallet
                </Button>
                <WalletProvider
                    providers={connectors}
                    onHide={() => setShowModal(false)}
                    show={showModal}
                />
            </>

        )
    }

    return (
        <Dropdown>
            <Dropdown.Toggle
                variant={dropdownVariant}
                className="d-flex align-items-center justify-content-center"
            >
                {wallet.shortenAddress}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={wallet.disconnect}>
                    Disconnect
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Account
