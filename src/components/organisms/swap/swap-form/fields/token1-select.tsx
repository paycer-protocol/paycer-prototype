import React, { useState } from 'react'
import { useFormikContext } from 'formik'
import { SwapProps } from '../types'
import TokenSelectModal from '@components/molecules/token-select-modal'
import TokenToggle from './token-toggle'
import {t} from '@lingui/macro'
import {marketPairs, swapTokens} from '@config/market-pairs'

export default function Token1Select() {
    const { values, setValues, setFieldValue } = useFormikContext<SwapProps>()
    const [showModal, setShowModal] = useState(false)

    const handleChange = async (token) => {
        const token1Markets = marketPairs.find(m => m.base.symbol === values.token0.symbol).markets

        const nextValues = {
          ...values,
          ...{
            token1Markets: token1Markets,
            token0Markets: swapTokens,
            token1: token,
            tradePair: {
              fromTokenAddress: values.tradePair.fromTokenAddress,
              toTokenAddress: token.chainAddresses[values.networkSettings.chainId],
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
                token={values.token1}
                onClick={() => setShowModal(true)}
                label={t`Swap to`}
            />
            <TokenSelectModal
                show={showModal}
                tokens={values.token1Markets}
                activeToken={values.token1}
                onHide={() => setShowModal(false)}
                onClick={handleChange}
            />
        </>
    )
}
