import React from 'react'
import {Trans, t} from '@lingui/macro'
import {toast} from 'react-toastify';
import useWallet from './hooks/useWallet'
import useNetwork from './hooks/useNetwork'
import Button from '@components/atoms/button'
import Modal from '@components/molecules/modal'
import { INetworkProvider } from './providers'
import NativeCurrencyIcon from './native-currency-icon'


export interface NetworkProviderProps {
  providers: {
    [chainId: number]: INetworkProvider
  }
  show: boolean
  onHide?: any
}


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
        <Modal.Body>
          <div className="d-flex align-items-center">
            {Object.keys(providers).map((chainId) => {
              const provider = providers[chainId]
              const isActive = wallet.isConnected && Number(chainId) === wallet.chainId

              return (
                  <Button
                    key={chainId}
                    variant="light"
                    className="d-flex align-items-center justify-content-center me-3 w-25"
                    active={isActive}
                    onClick={async () => {
                      await onHide()
                      await handleSwitchNetwork(provider)
                    }}
                  >
                    <NativeCurrencyIcon
                      chainId={Number(chainId)}
                      size={20}
                      className="me-2"
                    />
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
