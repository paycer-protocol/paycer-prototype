import React from 'react'
import { useFormikContext } from 'formik'
import { SwapProps } from '../types'
import TokenInput from '@components/molecules/token-input'

export default function Token1Input() {
    const { values, setValues } = useFormikContext<SwapProps>()

    const handleChange = (value: number) => {
        const nextValues = {
            ...values,
            ... {
                token0Value: value / Number(values.tradeContext?.expectedConvertQuote || 0),
                token1Value: value,
            }
        }

        setValues(nextValues)
        values.initFactory(nextValues)
    }

    return (
        <TokenInput
            name="token1Value"
            required
            currency={values?.tradeContext?.toToken?.symbol}
            handleChange={handleChange}
            balance={Number(values?.tradeContext?.toBalance || 0)}
            decimals={4}
        />
    )
}
