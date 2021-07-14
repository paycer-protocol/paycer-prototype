import React, {useState} from 'react'
import { Trans, t } from '@lingui/macro'
import { ChainId } from '@usedapp/core'
import { Eth, Bnb } from '@styled-icons/crypto'
import useToggle from '../../../hooks/useToggle'
import { CheckCircle } from '@styled-icons/bootstrap'
import NetworkProvider from '../web3/network-provider'
import { testNetNetworks } from './providers/networks'
import Button from '@components/atoms/button'
import Icon from '@components/atoms/icon'
import { Money } from '@components/atoms/number'
import Modal from '@components/molecules/modal'
import useWallet from './hooks/useWallet'
import useCopyClipboard from '@hooks/useCopyClipboard'
import ListGroup from '@components/molecules/list-group'
import { connectors } from './providers'
import './account-detail.styles.scss'


export interface AccountDetailProps {
    show: boolean
    onHide?: any
}

const IconMap = {
    [ChainId.BSC]: Bnb,
    default: Eth
}

declare global {
    interface Window {
        ethereum: any
    }
}

type ListGroupItemProps = {
    name: string
    description: string
    onClick?: any
    href?: string
    target?: string
    variant?: string
    children?: any
}

const AccountAction = (props: ListGroupItemProps) => {
    const { name, description, onClick, href, target, variant = 'light', children } = props

    return (
        <Button variant={variant} className="mb-2" href={href} target={target} onClick={onClick}>
            <div className="d-flex align-items-center justify-content-between py-3 px-2">
                <div className="text-start">
                    <strong>{name}</strong>
                    <p className="text-muted mb-0">
                        <small>{description}</small>
                    </p>
                </div>
                {children}
            </div>
        </Button>
    )
}

const AccountBalance = () => {
    const wallet = useWallet()
    const iconComponent = IconMap[wallet.chainName] || IconMap.default

    return (
        <div className="d-flex align-items-center justify-content-between mb-5 px-2">
            <div className="text-start">
                <strong><Trans>Balance</Trans></strong>
                <p className="text-muted mb-0">
                    <span className="h1">
                        <Money value={wallet.etherBalance} currency={wallet.etherSymbol} />
                    </span>
                </p>
            </div>
            <Icon component={iconComponent} size={35} />
        </div>
    )
}

const AccountDetail = (props: AccountDetailProps) => {
    const { show, onHide } = props
    const wallet = useWallet()
    const [isCopied, setCopied] = useCopyClipboard()
    const isMetaMask = window?.ethereum?.isMetaMask
    const [showNetworkProviders, toggleShowNetworkProviders] = useToggle(false)

    const determineModalTitle = () => {
        if (!wallet.isConnected) {
            return t`Connect to wallet`
        }

        if (wallet.isConnected && isMetaMask) {
            return t`Connected with MetaMask`
        }

        return t`Connected to wallet`
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton onHide={onHide}>
                <Modal.Title>
                    {determineModalTitle()}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {wallet.isConnected && (
                    <>
                        <AccountBalance />
                        <ListGroup>
                            <AccountAction
                                name={t`Explorer`}
                                description={t`View your wallet in Blockchain Explorer`}
                                href={wallet.explorerUrl}
                                target="_blank"
                            />
                            <AccountAction
                                name={t`Copy address`}
                                description={t`Copy your wallet address to clipboard`}
                                onClick={() => setCopied(wallet.address)}
                            >
                                {isCopied && <Icon component={CheckCircle} size={35} />}
                            </AccountAction>
                            <AccountAction
                                name={t`Switch network`}
                                description={t`Switches to another wallet provider`}
                                onClick={toggleShowNetworkProviders}
                            />
                            {(showNetworkProviders &&
                              <NetworkProvider
                                providers={testNetNetworks}
                              />
                            )}
                            <Button variant="danger" onClick={wallet.disconnect}
                               className='d-flex justify-content-center mt-3 text-center'>
                                <small><Trans>Disconnect</Trans></small>
                            </Button>
                        </ListGroup>
                    </>
                )}
                {!wallet.isConnected && (
                    <div className="d-flex justify-content-center">
                        <Button variant="outline-primary" className="px-5" onClick={() => wallet.connect(connectors[0])}>
                            <Trans>Connect to a Wallet</Trans>
                        </Button>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    )
}

export default AccountDetail
