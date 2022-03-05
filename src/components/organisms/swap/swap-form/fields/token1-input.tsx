import React from 'react'
import { useFormikContext } from 'formik'
import { SwapProps } from '../types'
import TokenInput from '@components/molecules/token-input'

export default function Token1Input() {
    const { values, setValues, setFieldValue } = useFormikContext<SwapProps>()

    const handleChange = async (value: number) => {
        const nextValues = {
            ...values,
            ... {
                token0Value: value / Number(values.tradeContext?.expectedConvertQuote || 0),
                token1Value: value,
            }
        }

        setValues(nextValues)

        if (values.token0 && values.token1) {
            setFieldValue('isLoading', true)
            const nextTradeContext = await values.initFactory(nextValues)
            setFieldValue('tradeContext', nextTradeContext)
            setFieldValue('isLoading', false)
        }
    }

    return (
        <TokenInput
            name="token1Value"
            disabled={!values.token0 && !values.token1}
            required
            currency={values?.tradeContext?.toToken?.symbol}
            handleChange={handleChange}
            balance={Number(values?.tradeContext?.toBalance || 0)}
            decimals={4}
        />
    )
}
