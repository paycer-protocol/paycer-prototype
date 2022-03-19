import React from 'react'
import {t} from "@lingui/macro";
import { useFormikContext } from 'formik'
import { SwapProps } from '../types'
import TokenInput from '@components/molecules/token-input'
import useSwap from "@hooks/use-swap";

export default function Token1Input() {
    const { values, setValues, setFieldValue, setFieldError } = useFormikContext<SwapProps>()

    const handleChange = async (value: number) => {

        let validate = true

        if (value > Number(values?.tradeContext?.toBalance)) {
            setFieldError('token1value', t`Insufficient ${values.token1.name} balance`)
            validate = false
        }

        const nextValues = {
            ...values,
            ... {
                token0Value: value / Number(values.tradeContext?.expectedConvertQuote || 0),
                token1Value: value,
                tradePair: {
                    fromTokenAddress: values.tradePair.fromTokenAddress,
                    toTokenAddress: values.tradePair.toTokenAddress,
                    amount: values.token0Value ? String(values.token0Value) : '1',
                },
            }
        }

        setValues(nextValues, validate)

        if (values.token0 && values.token1) {
            setFieldValue('isLoading', true, validate)
            const nextTradeContext = await values.initFactory(nextValues, setFieldValue, setValues)
            setFieldValue('tradeContext', nextTradeContext, validate)
            setFieldValue('isLoading', false, validate)
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
            decimals={5}
            readOnly={values.isLoading}
        />
    )
}
