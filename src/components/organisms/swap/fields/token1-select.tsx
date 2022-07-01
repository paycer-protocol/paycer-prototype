import React, { useState } from 'react'
import { useFormikContext } from 'formik'
import { connectors } from '@providers/connectors'
import TokenSelectModal from '@components/molecules/token-select-modal'
import WalletProvider from '@components/organisms/web3/wallet-provider'
import TokenToggle from '@components/molecules/token-toggler'
import { t } from '@lingui/macro'
import { useDapp } from '@context/dapp-context'
import { formatUnits } from '@ethersproject/units'
import useSwap from '@hooks/use-swap'
import { SwapProps, SwapTokenInputProps } from '../types'

export default function Token1Select(props: SwapTokenInputProps) {
  const { readOnly } = props
  const { values, setFieldValue } = useFormikContext<SwapProps>()
  const [showModal, setShowModal] = useState(false)
  const { isAuthenticated } = useDapp()

  const {
    fetchQuote,
  } = useSwap()

  const handleChange = async (token) => {
    setFieldValue('toToken', token)
    if (values.fromToken && values.fromTokenValue) {
      setFieldValue('isReloading', true)
      try {
        const result = await fetchQuote({ fromToken: values.fromToken, toToken: token, amount: values.fromTokenValue.toString() })
        const toTokenValue = formatUnits(result?.toTokenAmount.toString(), token.decimals)
        setFieldValue('toTokenValue', toTokenValue)
        setFieldValue('fee', values.fromTokenValue / 100)
        setFieldValue('isReloading', false)
      } catch (e) {
        setFieldValue('isReloading', false)
        setShowModal(false)
        console.log(e.message)
      }
      setFieldValue('isReloading', false)
    }
    setShowModal(false)
  }

  return (
    <>
      <TokenToggle
        token={values.toToken}
        onClick={() => setShowModal(true)}
        placeholder={t`Select a token`}
        label={t`You get`}
        readOnly={readOnly}
      />
      {isAuthenticated && (
        <TokenSelectModal
          show={showModal}
          tokens={values.toTokenMarkets.filter((token) => token.symbol !== values.fromToken?.symbol)}
          activeTokenSymbol={values.toToken?.symbol}
          onHide={() => setShowModal(false)}
          onClick={handleChange}
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
