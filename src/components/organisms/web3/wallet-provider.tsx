import React from 'react'
import { Trans } from '@lingui/macro'
import useWallet from './hooks/useWallet'
import Button from '@components/atoms/button'
import Alert from '@components/atoms/alert'
import Spinner from '@components/atoms/spinner'
import ListGroup from '@components/molecules/list-group'
import Modal from '@components/molecules/modal'
import { IConnectorProvider } from './providers'

export interface WalletProviderProps {
    providers: IConnectorProvider[]
    show: boolean
    onHide?: any
}

const WalletProvider = (props: WalletProviderProps) => {
    const { providers = [], show = false, onHide } = props
    const wallet = useWallet()

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton onHide={onHide}>
                <Modal.Title><Trans>Connect to a wallet</Trans></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant="danger" show={!!wallet.errorMessage}>
                    {wallet.errorMessage}
                </Alert>
                <ListGroup>
                    {providers.map(item => {
                        const isActivating = wallet.activatingConnector && wallet.activatingConnector === item.connector
                        const isDisabled = wallet.activatingConnector && wallet.activatingConnector !== item.connector

                        return (
                            <Button
                                key={item.name}
                                variant="light"
                                className="mb-2"
                                active={isActivating}
                                disabled={isDisabled}
                                onClick={async () => {
                                  await onHide()
                                  await wallet.connect(item)
                                }}
                            >
                                <div className="d-flex align-items-center justify-content-between py-3 px-2">
                                    <div className="text-start">
                                        <strong>{item.name}</strong>
                                        <p className="mb-0">
                                            <small className="text-muted">{item.description}</small>
                                        </p>
                                    </div>
                                    {
                                        isActivating
                                            ? <Spinner animation="border" />
                                            : <img src={item.icon} alt={item.name} width="28" />
                                    }
                                </div>
                            </Button>
                        )
                    })}
                </ListGroup>
            </Modal.Body>
        </Modal>
    )
}

export default WalletProvider
