import React from 'react'
import {Trans, t} from '@lingui/macro'
import {toast} from 'react-toastify';
import useWallet from '@hooks/use-wallet'
import useNetwork from '@hooks/use-network'
import Button from '@components/atoms/button'
import Modal from '@components/molecules/modal'
import { INetworkProvider } from '@providers/networks'

export interface NetworkProviderProps {
  providers: {
    [chainId: number]: INetworkProvider
  }
  show: boolean
  onHide?: any
}

const NetworkProvider = (props: NetworkProviderProps) => {
  const { providers = [], show = false, onHide } = props
  const { currentChainId, handleSwitchNetwork } = useNetwork()
  const { isConnected } = useWallet()

  return (
    <Modal size="sm" show={show} onHide={onHide}>
      <>
        <Modal.Header closeButton onHide={onHide}>
          <Modal.Title><Trans>Switch network</Trans></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column align-items-center">
            {Object.keys(providers).map((chainId) => {
              const provider = providers[chainId]
              const isActive = isConnected && Number(chainId) === currentChainId

              return (
                  <Button
                    key={chainId}
                    variant="primary"
                    className="d-flex align-items-center justify-content-center mb-3 w-100"
                    active={isActive}
                    onClick={async () => {
                      await onHide()
                      await handleSwitchNetwork(provider)
                    }}
                  >
                    <strong>{provider.chainName}</strong>
                  </Button>
              )
            })}
          </div>
        </Modal.Body>
      </>
    </Modal>
  )
}

export default NetworkProvider
