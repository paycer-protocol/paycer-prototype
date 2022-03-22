import React from 'react'
import { useFormikContext } from 'formik'
import { SwapProps, SwapTokenInputProps } from '../types'
import TokenInput from '@components/molecules/token-input'

export default function Token1Input(props: SwapTokenInputProps) {
    const { readOnly } = props
    const { values, setValues, setFieldValue, setFieldError } = useFormikContext<SwapProps>()

    const handleChange = async (value: number) => {

        const nextValues = {
            ...values,
            ... {
                token0Value: value / Number(values.tradeContext?.expectedConvertQuote || 0),
                token1Value: value,
                token1ValueByUserInput: value,
                tradePair: {
                    fromTokenAddress: values.tradePair.fromTokenAddress,
                    toTokenAddress: values.tradePair.toTokenAddress,
                    amount: values.token0Value ? String(values.token0Value) : '1',
                },
            }
        }

        if (values.token0 && values.token1) {
            setFieldValue('isLoading', true)
            const nextTradeContext = await values.initFactory(nextValues, setFieldValue, setValues)
            setFieldValue('tradeContext', nextTradeContext)
            setFieldValue('isLoading', false)
        }
    }

    return (
        <TokenInput
            name="token1Value"
            disabled={!values.token0 || !values.token1}
            required
            currency={values?.tradeContext?.toToken?.symbol}
            handleChange={handleChange}
            balance={Number(values?.tradeContext?.toBalance || 0)}
            decimals={6}
            readOnly={values.isLoading || readOnly}
        />
    )
}
