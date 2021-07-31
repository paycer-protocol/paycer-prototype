import React from 'react'
import styled from 'styled-components'
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

const StyledModalBody = styled(Modal.Body)`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    background: url(https://images.unsplash.com/photo-1590907047706-ee9c08cf3189?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80);
    background-size: cover;
    background-repeat: no-repeat;
`


const NetworkProvider = (props: NetworkProviderProps) => {
  const { providers = [], show = false, onHide } = props
  const network = useNetwork()
  const wallet = useWallet()

  const handleSwitchNetwork = async provider => {
    try {
      await network.switchNetwork(provider)
    } catch (error) {
      if (error.code === -32002) {
        toast(<Trans>Network-Switch Pending, please open your Wallet</Trans>)
      }
      if (error.code === 4902) {
        toast(<Trans>Adding Network to Wallet ...</Trans>)
        try {
          await network.addNetwork(provider)
        } catch (error) {
          if (error.code === -32002) {
            toast(<Trans>Previously added network Pending, please open your Wallet</Trans>)
          }
        }
      }
    }
  }

  return (
    <Modal show={show} onHide={onHide}>
      <>
        <Modal.Header closeButton onHide={onHide}>
          <Modal.Title><Trans>Switch network</Trans></Modal.Title>
        </Modal.Header>
        <StyledModalBody>
          <div className="d-flex flex-column align-items-center w-50">
            {Object.keys(providers).map((chainId) => {
              const provider = providers[chainId]
              const isActive = wallet.isConnected && Number(chainId) === wallet.chainId

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
        </StyledModalBody>
      </>
    </Modal>
  )
}

export default NetworkProvider
