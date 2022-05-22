import React from 'react'
import {Trans, t} from '@lingui/macro'
import { useDapp } from '@context/dapp-context'
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
  const { isAuthenticated, currentChainId, handleSwitchNetwork } = useDapp()

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
              const isActive = isAuthenticated && Number(chainId) === currentChainId

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
