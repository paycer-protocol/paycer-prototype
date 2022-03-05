import React, { useState } from 'react'
import { useFormikContext } from 'formik'
import {t} from '@lingui/macro'
import { connectors } from '@providers/connectors'
import useWallet from '@hooks/use-wallet'
import useNetwork from '@hooks/use-network'
import TokenSelectModal from '@components/molecules/token-select-modal'
import WalletProvider from '@components/organisms/web3/wallet-provider'
import { swapTokens } from '@config/market-pairs'
import { SwapProps } from '../types'
import TokenToggle from './token-toggle'

export default function Token0Select() {
    const { values, setValues, setFieldValue } = useFormikContext<SwapProps>()
    const [showModal, setShowModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const wallet = useWallet()
    const network = useNetwork()

    const handleChange = async (token) => {
        setErrorMessage('')

        try {
            const nextValues = {
                ...values,
                ...{
                    token0: token,
                    token0Markets: swapTokens,
                    token1Value: 0,
                    tradePair: {
                        fromTokenAddress: token.chainAddresses[values.networkSettings.chainId],
                        toTokenAddress: values.tradePair.toTokenAddress,
                        amount: values.tradePair.amount || '1',
                    },
                    networkSettings: {
                        providerUrl: network.rpcUrls[0],
                        walletAddress: wallet.address,
                        networkProvider: network.provider,
                        chainId: network.chainId,
                        nameNetwork: network.chainName,
                        multicallContractAddress: network.multicallAddress,
                        nativeCurrency: network.nativeCurrency,
                        nativeWrappedTokenInfo: network.nativeWrappedTokenInfo
                    }
                }
            }

            if (nextValues.token0 && nextValues.token1) {
                setFieldValue('isLoading', true)
                const nextTradeContext = await values.initFactory(nextValues)
                setValues(nextValues)
                setFieldValue('tradeContext', nextTradeContext)
                setShowModal(false)
                setFieldValue('isLoading', false)
            } else {
                setValues(nextValues)
                setShowModal(false)
            }
        } catch (e) {
            setErrorMessage(e.message)
            setFieldValue('isLoading', false)
        }
    }

    return (
      <>
        <TokenToggle
          token={values.token0}
          onClick={() => setShowModal(true)}
          label={t`Swap from`}
        />
          {wallet.isConnected && (
            <TokenSelectModal
              show={showModal}
              tokens={values.token0Markets}
              activeToken={values.token0}
              onHide={() => setShowModal(false)}
              onClick={handleChange}
              errorMessage={errorMessage}
            />
          )}
          {!wallet.isConnected && showModal && (
            <WalletProvider
              providers={connectors}
              onHide={() => setShowModal(false)}
            />
          )}
      </>
    )
}
