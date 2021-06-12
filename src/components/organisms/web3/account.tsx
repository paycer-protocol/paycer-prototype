import React from 'react'
import { ButtonVariant } from 'react-bootstrap/types'
import Avatar, { generateAvatarSource } from '../../atoms/avatar'
import Button from '../../atoms/button'
import Dropdown from '../../atoms/dropdown'
import useWallet from './hooks/useWallet'
import { connectors } from './providers'

export interface AccountProps {
    buttonVariant?: ButtonVariant
    dropdownVariant?: ButtonVariant
}

const Account = (props: AccountProps) => {
    const {
        buttonVariant = 'outline-dark',
        dropdownVariant = 'outline-dark',
    } = props

    const wallet = useWallet()

    if (!wallet.isConnected) {
        return (
            <Button
                variant={buttonVariant}
                className="px-5"
                onClick={() => wallet.connect(connectors[0])}
            >
                Connect to a Wallet
            </Button>
        )
    }

    return (
        <Dropdown>
            <Dropdown.Toggle
                variant={dropdownVariant}
                className="d-flex align-items-center justify-content-center"
            >
                <div className="mr-3">
                    {wallet.shortenAddress}
                </div>
                <Avatar
                    src={generateAvatarSource(wallet.shortenAddress)}
                    alt={wallet.shortenAddress}
                    size="xs"
                />
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
