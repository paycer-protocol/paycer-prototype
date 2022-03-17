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
import useSwap from "@hooks/use-swap";

export default function Token0Select() {
    const { values, setValues, setFieldValue } = useFormikContext<SwapProps>()
    const [showModal, setShowModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const wallet = useWallet()

    const handleChange = async (token) => {
        setErrorMessage('')

        try {
            const nextValues = {
                ...values,
                ...{
                    token0: token,
                    token0Markets: swapTokens,
                    token1Value: null,
                    networkSettings: values.networkSettings,
                    tradePair: {
                        fromTokenAddress: token.chainAddresses[values.networkSettings.chainId],
                        toTokenAddress: values.tradePair.toTokenAddress,
                        amount: values.tradePair.amount || '1',
                    },
                }
            }

            if (nextValues.token0 && nextValues.token1) {
                setFieldValue('isLoading', true)
                const nextTradeContext = await values.initFactory(nextValues, setFieldValue, setValues)
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
