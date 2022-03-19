import React from 'react'
import { useFormikContext } from 'formik'
import { SwapProps } from '../types'
import TokenInput from '@components/molecules/token-input'
import {t} from "@lingui/macro";

export default function Token0Input() {
    const { values, setValues, setFieldValue, setFieldError } = useFormikContext<SwapProps>()

    const handleChange = async (value: number) => {

        let validate = true

        if (value > Number(values.tradeContext?.fromBalance?.balance)) {
            setFieldError('token0value', t`Insufficient ${values.token0.name} balance`)
            validate = false
        }

        const nextValues = {
            ...values,
            ... {
                token0Value: value,
                token1Value: Number(value) * Number(values.tradeContext?.expectedConvertQuote || 0),
                tradePair: {
                    fromTokenAddress: values.tradePair.fromTokenAddress,
                    toTokenAddress: values.tradePair.toTokenAddress,
                    amount: value ? String(value) : '1',
                },
            }
        }

        setValues(nextValues, validate)

        if (values.token0 && values.token1) {
            setFieldValue('isLoading', true, validate)
            const nextTradeContext = await values.initFactory(nextValues, setFieldValue, setValues)
            setFieldValue('isLoading', false, validate)
            setFieldValue('tradeContext', nextTradeContext, validate)
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
            decimals={5}
            readOnly={values.isLoading}
        />
    )
}

