import React from 'react'
import { ChainId } from '@usedapp/core'
import { Eth, Bnb } from '@styled-icons/crypto'
import Button from '../../atoms/button'
import Icon from '../../atoms/icon'
import Modal from '../../molecules/modal'
import useWallet from './hooks/useWallet'
import './account-detail.styles.scss'
import ListGroup from '../../molecules/list-group'

export interface AccountDetailProps {}

const IconMap = {
    [ChainId.BSC]: Bnb,
    default: Eth
}

const AccountDetail = (props: AccountDetailProps) => {
    const {} = props
    const wallet = useWallet()
        const isMetaMask = window.ethereum && window.ethereum.isMetaMask

    return (
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>
                    {isMetaMask ? 'Connected with MetaMask' : 'Connected to wallet'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    <div className='d-flex align-items-center justify-content-between py-3 px-2'>
                        <div className='text-left'>
                            <strong>Balance</strong>
                            <p className='text-muted mb-0'>
                                <small>{Number(wallet.etherBalance || 0).toFixed(4)}&nbsp;{wallet.etherSymbol}</small>
                            </p>
                        </div>
                        <Icon component={IconMap[wallet.chainName] || IconMap.default} size={35} />
                    </div>
                    <Button variant='outline-dark' className='mb-2'>
                        <div className='d-flex align-items-center justify-content-between py-3 px-2'>
                            <div className='text-left'>
                                <strong>View</strong>
                                <p className='text-muted mb-0'>
                                    <small>View your wallet in Blockchain Explorer</small>
                                </p>
                            </div>
                        </div>
                    </Button>
                    <Button variant='outline-dark' className='mb-2'>
                        <div className='d-flex align-items-center justify-content-between py-3 px-2'>
                            <div className='text-left'>
                                <strong>Copy</strong>
                                <p className='text-muted mb-0'>
                                    <small>Copy your wallet address to clipboard</small>
                                </p>
                            </div>
                        </div>
                    </Button>
                    <Button variant='outline-dark' className='mb-2'>
                        <div className='d-flex align-items-center justify-content-between py-3 px-2'>
                            <div className='text-left'>
                                <strong>Switch</strong>
                                <p className='text-muted mb-0'>
                                    <small>Switches to another wallet provider</small>
                                </p>
                            </div>
                        </div>
                    </Button>
                    <div className='d-flex justify-content-center text-danger mb-0 text-center'>
                        <small>Disconnect</small>
                    </div>
                </ListGroup>
            </Modal.Body>
        </Modal.Dialog>
    )
}

export default AccountDetail
