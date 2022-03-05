import React, { useState } from 'react'
import { useFormikContext } from 'formik'
import { t } from '@lingui/macro'
import { connectors } from '@providers/connectors'
import useWallet from '@hooks/use-wallet'
import TokenSelectModal from '@components/molecules/token-select-modal'
import WalletProvider from '@components/organisms/web3/wallet-provider'
import { swapTokens } from '@config/market-pairs'
import { SwapProps } from '../types'
import TokenToggle from './token-toggle'
import useSwap from "@hooks/use-swap";

export default function Token1Select() {
    const { values, setValues, setFieldValue } = useFormikContext<SwapProps>()
    const [showModal, setShowModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const wallet = useWallet()
    const {
        networkSettings,
    } = useSwap()

    const handleChange = async (token) => {
      setErrorMessage('')

      try {
        const nextValues = {
          ...values,
          ...{
            token1Markets: swapTokens,
            token1: token,
            tradePair: {
              fromTokenAddress: values.tradePair.fromTokenAddress,
              toTokenAddress: token.chainAddresses[values.networkSettings.chainId],
              amount: values.tradePair.amount,
            },
              networkSettings
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
            token={values.token1}
            onClick={() => setShowModal(true)}
            label={t`Swap to`}
        />
        {wallet.isConnected && (
          <TokenSelectModal
            show={showModal}
            tokens={values.token1Markets}
            activeToken={values.token1}
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
