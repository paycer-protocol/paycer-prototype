import React, { useState } from 'react'
import { useFormikContext } from 'formik'
import { t } from '@lingui/macro'
import { marketPairs, swapTokens } from '@config/market-pairs'
import TokenSelectModal from '@components/molecules/token-select-modal'
import TokenToggle from './token-toggle'
import { SwapProps } from '../types'

export default function Token0Select() {
    const { values, setValues, setFieldValue } = useFormikContext<SwapProps>()
    const [showModal, setShowModal] = useState(false)

    const handleChange = async (token) => {
        const token1Markets = marketPairs.find(m => m.base.symbol === token.symbol).markets

        const nextValues = {
            ...values,
            ...{
                token0: token,
                token0Markets: swapTokens,
                token1: token1Markets[0],
                token1Markets: token1Markets,
                tradePair: {
                    fromTokenAddress: token.tokenAddress,
                    toTokenAddress: token1Markets[0][values.networkSettings.chainId].tokenAddress,
                    amount: values.tradePair.amount,
                },
            }
        }

        const nextTradeContext = await values.initFactory(nextValues)
        setValues(nextValues)
        setFieldValue('tradeContext', nextTradeContext)
        setShowModal(false)
    }

    return (
      <>
        <TokenToggle
          token={values.token0}
          onClick={() => setShowModal(true)}
          label={t`Swap from`}
        />
        <TokenSelectModal
          show={showModal}
          tokens={values.token0Markets}
          activeToken={values.token0}
          onHide={() => setShowModal(false)}
          onClick={handleChange}
        />
      </>
    )
}
