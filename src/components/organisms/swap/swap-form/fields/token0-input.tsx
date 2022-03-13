import React from 'react'
import { useFormikContext } from 'formik'
import { SwapProps } from '../types'
import TokenInput from '@components/molecules/token-input'

export default function Token0Input() {
    const { values, setValues, setFieldValue } = useFormikContext<SwapProps>()

    const handleChange = async (value: number) => {

        if (value > Number(values.tradeContext?.fromBalance?.balance)) {
            setFieldValue('token0value', Number(values.tradeContext?.fromBalance?.balance))
            value = Number(values.tradeContext?.fromBalance?.balance)
        }

        const nextValues = {
            ...values,
            ... {
                token0Value: value,
                token1Value: Number(value) * Number(values.tradeContext?.expectedConvertQuote || 0),
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
            name="token0Value"
            disabled={!values.token0 || !values.token1}
            required
            currency={values?.token0?.symbol}
            handleChange={handleChange}
            raiseMax
            balance={Number(values.tradeContext?.fromBalance?.balance || 0)}
            decimals={4}
        />
    )
}

