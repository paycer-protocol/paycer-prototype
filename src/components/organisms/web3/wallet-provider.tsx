import React from 'react'
import useWallet from './hooks/useWallet'
import Button from '../../atoms/button'
import ListGroup from '../../molecules/list-group'
import Modal from '../../molecules/modal'

export interface Provider {
    connector: any
    name: string
    description?: string
    icon: string
}

export interface WalletProviderProps {
    providers: Provider[]
}

const WalletProvider = (props: WalletProviderProps) => {
    const { providers = [] } = props
    const wallet = useWallet()


    const handleConnect = (provider: Provider) => {
        wallet.connect(provider.connector)
    }

    return (
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>Connect to a wallet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    {providers.map(item => (
                        <Button key={item.name} variant="outline-dark" className="mb-2" onClick={() => handleConnect(item)}>
                            <div className="d-flex align-items-center justify-content-between py-3 px-2">
                                <div className="text-left">
                                    <strong>{item.name}</strong>
                                    <p className="text-muted mb-0">
                                        <small>{item.description}</small>
                                    </p>
                                </div>
                                <img src={item.icon} alt={item.name} width="24" height="24" />
                            </div>
                        </Button>
                    ))}
                </ListGroup>
            </Modal.Body>
        </Modal.Dialog>
    )
}

export default WalletProvider
