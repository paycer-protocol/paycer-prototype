import React from 'react'
import { ChainId } from '@usedapp/core'
import { Eth, Bnb } from '@styled-icons/crypto'
import { CheckCircle } from '@styled-icons/bootstrap'
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
                <strong>Balance</strong>
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

    const determineModalTitle = () => {
        if (!wallet.isConnected) {
            return 'Connect to wallet'
        }

        if (wallet.isConnected && isMetaMask) {
            return 'Connected with MetaMask'
        }

        return 'Connected to wallet'
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
                                name="Explorer"
                                description="View your wallet in Blockchain Explorer"
                                href={wallet.explorerUrl}
                                target="_blank"
                            />
                            <AccountAction
                                name="Copy address"
                                description="Copy your wallet address to clipboard"
                                onClick={() => setCopied(wallet.address)}
                            >
                                {isCopied && <Icon component={CheckCircle} size={35} />}
                            </AccountAction>
                            <AccountAction
                                name="Switch network"
                                description="Switches to another wallet provider"
                                onClick={() => setCopied(wallet.address)}
                            />
                            <a onClick={wallet.disconnect}
                               className='d-flex justify-content-center text-danger mt-3 text-center'>
                                <small>Disconnect</small>
                            </a>
                        </ListGroup>
                    </>
                )}
                {!wallet.isConnected && (
                    <div className="d-flex justify-content-center">
                        <Button variant="outline-primary" className="px-5" onClick={() => wallet.connect(connectors[0])}>
                            Connect to a Wallet
                        </Button>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    )
}

export default AccountDetail
