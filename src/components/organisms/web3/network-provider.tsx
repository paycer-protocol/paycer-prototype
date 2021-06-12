import React from 'react'
import useWallet from './hooks/useWallet'
import useNetwork from './hooks/useNetwork'
import Button from '../../atoms/button'
import Alert from '../../atoms/alert'
import ListGroup from '../../molecules/list-group'
import Modal from '../../molecules/modal'
import { INetworkProvider } from './providers'

export interface NetworkProviderProps {
    providers: {
        [chainId: number]: INetworkProvider
    }
}

const NetworkProvider = (props: NetworkProviderProps) => {
    const { providers = {} } = props
    const network = useNetwork()
    const wallet = useWallet()

    return (
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>Select a Network</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant="danger" show={!!wallet.errorMessage}>
                    {wallet.errorMessage}
                </Alert>
                <ListGroup>
                    {Object.keys(providers).map((chainId) => {
                        const provider = providers[chainId]
                        const isActive = wallet.isConnected && Number(chainId) === wallet.chainId

                        return (
                            <Button
                                key={chainId}
                                variant="outline-dark"
                                className="mb-2"
                                active={isActive}
                                onClick={() => network.changeNetwork(provider)}
                            >
                                <div className="d-flex align-items-center justify-content-between py-3 px-2">
                                    <div className="text-left">
                                        <strong>{provider.chainName}</strong>
                                    </div>
                                </div>
                            </Button>
                        )
                    })}
                </ListGroup>
            </Modal.Body>
        </Modal.Dialog>
    )
}

export default NetworkProvider
