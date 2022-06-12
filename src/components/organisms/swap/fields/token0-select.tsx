import React, { useState } from 'react'
import { useFormikContext } from 'formik'
import {t} from '@lingui/macro'
import { connectors } from '@providers/connectors'
import TokenSelectModal from '@components/molecules/token-select-modal'
import WalletProvider from '@components/organisms/web3/wallet-provider'
import { initialFromTokenValue } from '@config/market-pairs'
import { SwapProps, SwapTokenInputProps } from '../types'
import TokenToggle from '@components/molecules/token-toggler'
import { useDapp } from '@context/dapp-context'
import {formatUnits} from "@ethersproject/units";
import useSwap from "@hooks/use-swap_";

export default function Token0Select(props: SwapTokenInputProps) {
    const { readOnly } = props
    const { values, setFieldValue } = useFormikContext<SwapProps>()
    const [showModal, setShowModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const { isAuthenticated } = useDapp()

    const {
        isLoading,
        fetchQuote,
    } = useSwap()

    const handleChange = async (token) => {
        setErrorMessage('')
        setFieldValue('fromToken', token)
        if (!values.fromTokenValue) {
            setFieldValue('fromTokenValue', initialFromTokenValue)
        }
        if (values.toToken && values.fromTokenValue) {
            const result = await fetchQuote({ fromToken: token, toToken: values.toToken, amount: values.fromTokenValue.toString() })
            const toTokenValues = formatUnits(result?.toTokenAmount.toString(), values.toToken.decimals)
            setFieldValue('toTokenValue', toTokenValues)
        }
        setShowModal(false)
    }

    return (
      <>
        <TokenToggle
          token={values.fromToken}
          onClick={() => setShowModal(true)}
          placeholder={t`Select a token`}
          label={t`Swap from`}
          readOnly={readOnly}
        />
          {isAuthenticated && (
            <TokenSelectModal
              show={showModal}
              tokens={values.fromTokenMarkets.filter(token => token.symbol !== values.toToken?.symbol)}
              activeTokenSymbol={values.fromToken?.symbol}
              onHide={() => setShowModal(false)}
              onClick={handleChange}
              errorMessage={errorMessage}
            />
          )}
          {!isAuthenticated && showModal && (
            <WalletProvider
              providers={connectors}
              onHide={() => setShowModal(false)}
            />
          )}
      </>
    )
}
