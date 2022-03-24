import React, { useState } from 'react'
import { useFormikContext } from 'formik'
import {t} from '@lingui/macro'
import { connectors } from '@providers/connectors'
import TokenSelectModal from '@components/molecules/token-select-modal'
import WalletProvider from '@components/organisms/web3/wallet-provider'
import { swapTokens } from '@config/market-pairs'
import { SwapProps, SwapTokenInputProps } from '../types'
import TokenToggle from '@components/molecules/token-toggler'
import useWallet from "@hooks/use-wallet";

export default function Token0Select(props: SwapTokenInputProps) {
    const { readOnly } = props
    const { values, setValues, setFieldValue } = useFormikContext<SwapProps>()
    const [showModal, setShowModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const wallet = useWallet()

    const handleChange = async (token) => {
        setErrorMessage('')

        const networkSettings = values.networkSettings
        networkSettings.walletAddress = wallet.address
        setFieldValue('quoteChangedState', null)

        try {
            const nextValues = {
                ...values,
                ...{
                    token0Markets: swapTokens,
                    token0: token,
                    token1Value: null,
                    tradePair: {
                        fromTokenAddress: token.chainAddresses[networkSettings.chainId],
                        toTokenAddress: values.tradePair.toTokenAddress,
                        amount: values.token0Value ? String(values.token0Value) : '1',
                    },
                    networkSettings
                }
            }

            if (nextValues.token0 && nextValues.token1) {
                setFieldValue('isLoading', true)
                const nextTradeContext = await values.initFactory(nextValues, setFieldValue, setValues)
                setValues(nextValues)
                setFieldValue('tradeContext', nextTradeContext)
                setShowModal(false)
                if (values.token1Value) {
                    setFieldValue('token1Value', nextTradeContext.expectedConvertQuote)
                }
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
          placeholder={t`Select a token`}
          label={t`Swap from`}
          readOnly={readOnly}
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