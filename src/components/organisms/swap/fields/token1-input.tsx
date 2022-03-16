import React from 'react'
import {t} from "@lingui/macro";
import { useFormikContext } from 'formik'
import { SwapProps } from '../types'
import TokenInput from '@components/molecules/token-input'
import useSwap from "@hooks/use-swap";

export default function Token1Input() {
    const { values, setValues, setFieldValue, setFieldError } = useFormikContext<SwapProps>()

    const {
        initFactory
    } = useSwap()

    const handleChange = async (value: number) => {

        if (value > Number(values?.tradeContext?.toBalance)) {
            setFieldError('token1value', t`Insufficient ${values.token1.name} balance`)
            return
        }

        if (value / Number(values?.tradeContext?.expectedConvertQuote) > Number(values.tradeContext?.fromBalance?.balance)) {
            setFieldError('token1value', t`Insufficient ${values.token0.name} balance`)
            return
        }

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
            const nextTradeContext = await initFactory(nextValues, setFieldValue, setValues)
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
            decimals={4}
        />
    )
}
