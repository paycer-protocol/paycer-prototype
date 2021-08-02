import React, { useState } from 'react'
import { t, Trans} from '@lingui/macro'
import { NoEthereumProviderError } from '@web3-react/injected-connector'
import useWallet from '@hooks/use-wallet'
import Button from '@components/atoms/button'
import Alert from '@components/atoms/alert'
import Spinner from '@components/atoms/spinner'
import ListGroup from '@components/molecules/list-group'
import Modal from '@components/molecules/modal'
import { IConnectorProvider } from '@providers/connectors'

export interface WalletProviderProps {
  providers: IConnectorProvider[]
  show: boolean
  onHide?: any
}


const WalletProvider = (props: WalletProviderProps) => {
  const { providers = [], show = false, onHide } = props
  const [errorMessage, setErrorMessage] = useState(null)
  const wallet = useWallet()

  const handleConnect = async (provider: IConnectorProvider) => {
    try {
      await wallet.connect(provider)
      await onHide()
    } catch (e) {
      let message
      if (e instanceof NoEthereumProviderError) {
        message = t`No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.`
      } else if (e.message.includes('Unsupported chain')) {
        message = t`You're connected to an unsupported network. Please open your browser extension and change the network.`
      } else if (provider.rejectedError && e instanceof provider.rejectedError) {
        message = t`Please authorize this website to access your Ethereum account.`
      } else if (e.message.includes('already pending')) {
        message = t`Please open your wallet and connect your account.`
      } else {
        message = t`An unknown error occurred. Please try again.`
      }

      setErrorMessage(message)
    }
  }

  return (
    <Modal show={show} onHide={onHide}>
      <>
        <Modal.Header closeButton onHide={onHide}>
          <Modal.Title><Trans>Connect to a wallet</Trans></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="danger" show={!!errorMessage}>
            {errorMessage}
          </Alert>
          <ListGroup>
            {providers.map(item => {
              const isActivating = wallet.activatingConnector && wallet.activatingConnector === item.connector
              const isDisabled = wallet.activatingConnector && wallet.activatingConnector !== item.connector

              return (
                <Button
                  key={item.name}
                  variant="outline-primary"
                  className="mb-2"
                  active={isActivating}
                  disabled={isDisabled}
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
      </>
    </Modal>
  )
}

export default WalletProvider
