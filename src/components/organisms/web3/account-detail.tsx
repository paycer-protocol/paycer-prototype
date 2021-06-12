import React from 'react'
import {ChainId} from '@usedapp/core'
import {Eth, Bnb} from '@styled-icons/crypto'
import {CheckCircle} from '@styled-icons/bootstrap'
import Button from '../../atoms/button'
import Icon from '../../atoms/icon'
import Modal from '../../molecules/modal'
import useWallet from './hooks/useWallet'
import useCopyClipboard from '../../../hooks/useCopyClipboard'
import ListGroup from '../../molecules/list-group'
import Account from './account'
import './account-detail.styles.scss'


export interface AccountDetailProps {
}


const IconMap = {
    [ChainId.BSC]: Bnb,
    default: Eth
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

declare global {
    interface Window {
        ethereum: any
    }
}

const AccountAction = (props: ListGroupItemProps) => {
    const { name, description, onClick, href, target, variant = 'outline-dark', children } = props

    return (
        <Button variant={variant} className="mb-2" href={href} target={target} onClick={onClick}>
            <div className="d-flex align-items-center justify-content-between py-3 px-2">
                <div className="text-left">
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

const AccountContent = (props: ListGroupItemProps) => {
    const { name, description, onClick, href, target, variant = 'outline-dark', children } = props

    return (
        <Button variant={variant} className="mb-2" href={href} target={target} onClick={onClick}>
            <div className="d-flex align-items-center justify-content-between py-3 px-2">
                <div className="text-left">
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

    return (
        <div className='d-flex align-items-center justify-content-between py-3 px-2'>
            <div className='text-left'>
                <strong>Balance</strong>
                <p className='text-muted mb-0'>
                    <small>{Number(wallet.etherBalance || 0).toFixed(4)}&nbsp;{wallet.etherSymbol}</small>
                </p>
            </div>
            <Icon component={IconMap[wallet.chainName] || IconMap.default} size={35} />
        </div>
    )
}


const AccountDetail = (props: AccountDetailProps) => {
    const {} = props
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
        <Modal.Dialog>
            <Modal.Header closeButton>
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
                                name="View"
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
                        <Button variant="outline-primary" className="px-5" onClick={wallet.connect}>
                            Connect to a Wallet
                        </Button>
                    </div>
                )}
            </Modal.Body>
        </Modal.Dialog>
    )
}

export default AccountDetail
