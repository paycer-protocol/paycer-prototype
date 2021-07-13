import React, { useState } from 'react'
import styled from 'styled-components'
import './account.styles.scss'
import { ButtonVariant } from 'react-bootstrap/types'
import Button from '@components/atoms/button'
import useWallet from './hooks/useWallet'
import WalletProvider from '../web3/wallet-provider'
import AccountDetail from './account-detail'
import { connectors } from './providers'
import Icon from '@components/atoms/icon'
import {ChainId} from '@usedapp/core'
import {Bnb, Eth} from '@styled-icons/crypto'

export interface AccountProps {
    buttonVariant?: ButtonVariant
    dropdownVariant?: ButtonVariant
}

const IconMap = {
    [ChainId.BSC]: Bnb,
    default: Eth
}

const StyledBalanceIcon = styled(Icon)`
  position: relative;
  top: -1px;
  margin: 0 5px 0 10px;
`

const Account = (props: AccountProps) => {
    const { buttonVariant = 'outline-primary', dropdownVariant = 'outline-primary' } = props
    const [showWalletProviderModal, setShowWalletProviderModal] = useState(false)
    const [showAccountModal, setShowAccountModal] = useState(false)
    const wallet = useWallet()

    const AccountBalance = () => {
        const iconComponent = IconMap[wallet.chainName] || IconMap.default
        let etherBalance = Number(wallet.etherBalance || 0).toFixed(4)
        etherBalance += ' '
        etherBalance += wallet.etherSymbol

        return (
            <div className="p-2">
                {etherBalance}
                <StyledBalanceIcon component={iconComponent} size={20} />
            </div>
        )
    }

    if (!wallet.isConnected) {
        return (
            <>
                <Button
                    variant={buttonVariant}
                    className="px-4 text-nowrap p-2 bg-dark pt-3 pb-3"
                    onClick={() => setShowWalletProviderModal(true)}
                >
                    Connect to a Wallet
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
                variant={dropdownVariant}
                className="d-flex align-items-center justify-content-center p-2 bg-dark"
                onClick={() => setShowAccountModal(true)}
            >
                <AccountBalance />
                <div className="bg-dark-soft rounded-2 p-3 pt-2 pb-2">
                    {wallet.shortenAddress}
                </div>
            </Button>
            <AccountDetail
                onHide={() => setShowAccountModal(false)}
                show={showAccountModal}
            />
        </>
    )
}

export default Account
