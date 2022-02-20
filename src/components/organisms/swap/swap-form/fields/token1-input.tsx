import React from 'react'
import { useFormikContext } from 'formik'
import { SwapProps } from '../types'
import TokenInput from '@components/molecules/token-input'

export default function Token1Input() {
    const { values, setFieldValue } = useFormikContext<SwapProps>()

    const handleChange = (value:number) => {
        setFieldValue('token1Value', value)
        setFieldValue('token0Value', value * Number(values.tradeContext?.expectedConvertQuote || 0))
    }

    return (
        <TokenInput
            name="token1Value"
            required
            currency={values.token1.symbol}
            handleChange={handleChange}
            balance={Number(values.tradeContext.toBalance || 0)}
            decimals={4}
        />
    )
}
