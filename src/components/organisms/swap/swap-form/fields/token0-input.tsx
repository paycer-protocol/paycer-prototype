import React from 'react'
import { useFormikContext } from 'formik'
import { SwapProps } from '../types'
import TokenInput from '@components/molecules/token-input'

export default function Token0Input() {
    const { values, setValues, setFieldValue } = useFormikContext<SwapProps>()

    const handleChange = async (value: number) => {
        const nextValues = {
            ...values,
            ... {
                token0Value: value,
                token1Value: Number(value) * Number(values.tradeContext?.expectedConvertQuote || 0),
            }
        }

        setValues(nextValues)

        if (values.token0 && values.token1) {
            const nextTradeContext = await values.initFactory(nextValues)
            setFieldValue('tradeContext', nextTradeContext)
        }

    }

    return (
        <TokenInput
            name="token0Value"
            required
            currency={values?.token0?.symbol}
            handleChange={handleChange}
            raiseMax
            balance={Number(values.tradeContext?.fromBalance?.balance || 0)}
            decimals={4}
        />
    )
}

