import React from 'react'
import { useFormikContext } from 'formik'
import { SwapProps } from '../types'
import TokenInput from '@components/molecules/token-input'

export default function Token0Input() {
    const { values, setValues } = useFormikContext<SwapProps>()

    const handleChange = async (value: number) => {
        setValues({
            ...values,
            ... {
                token0Value: value,
                token1Value: Number(value) * Number(values.tradeContext?.expectedConvertQuote || 0),
            }
        })
    }

    return (
        <TokenInput
            name="token0Value"
            required
            currency={values.token0.symbol}
            handleChange={handleChange}
            raiseMax
            balance={Number(values.tradeContext?.fromBalance?.balance || 0)}
            decimals={4}
        />
    )
}

