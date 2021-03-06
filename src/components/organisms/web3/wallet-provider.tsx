import React, { useState } from 'react'
import { t } from '@lingui/macro'
import { useDapp } from '@context/dapp-context'
import Button from '@components/atoms/button'
import Alert from '@components/atoms/alert'
import Spinner from '@components/atoms/spinner'
import ListGroup from '@components/molecules/list-group'
import Modal from '@components/molecules/modal'
import { IConnectorProvider } from '@providers/connectors'

export interface WalletProviderProps {
  providers: IConnectorProvider[]
  onHide?: any
}

const WalletProvider = (props: WalletProviderProps) => {
  const { providers = [], onHide } = props
  const [errorMessage, setErrorMessage] = useState(null)
  const { handleWalletConnect, isWeb3EnableLoading, activeWallet } = useDapp()

  const handleConnect = async (provider: IConnectorProvider) => {
    try {
      await handleWalletConnect(provider)
      onHide()
    } catch (e) {
      setErrorMessage(e.message)
    }
  }

  return (
    <Modal show onHide={onHide}>
      <>
        <Modal.Header closeButton onHide={onHide}>
          <Modal.Title>
            {/*@ts-ignore*/}
            {t`Connect to a wallet`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="danger" show={!!errorMessage}>
            {errorMessage}
          </Alert>
          <ListGroup>
            {providers.map(item => {
              return (
                <Button
                  style={{ borderRadius: '10px' }}
                  key={item.name}
                  variant="outline-primary"
                  className="mb-2"
                  active={item.providerId === activeWallet}
                  disabled={isWeb3EnableLoading}
                  onClick={() => handleConnect(item)}
                >
                  <div className="d-flex align-items-center justify-content-between py-3 px-2">
                    <div className="text-start">
                      <strong className="text-white">{item.name}</strong>
                      <p className="mb-0">
                        <small className="text-muted">{item.description}</small>
                      </p>
                    </div>
                    {
                      isWeb3EnableLoading
                        ? <Spinner animation="border" />
                        : <img src={item.icon} alt={item.name} width="28" />
                    }
                  </div>
                </Button>
              )
            })}
          </ListGroup>
        </Modal.Body>
      </>
    </Modal>
  )
}

export default WalletProvider
