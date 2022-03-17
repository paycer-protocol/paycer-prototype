import React from 'react'
import { useFormikContext } from 'formik'
import { SwapProps } from '../types'
import TokenInput from '@components/molecules/token-input'
import {t} from "@lingui/macro";
import useSwap from "@hooks/use-swap";

export default function Token0Input() {
    const { values, setValues, setFieldValue, setFieldError } = useFormikContext<SwapProps>()

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
            setFieldValue('isLoading', true)
            const nextTradeContext = await values.initFactory(nextValues, setFieldValue, setValues)
            console.log(nextTradeContext)
            setFieldValue('isLoading', false)
            setFieldValue('tradeContext', nextTradeContext)
        }

        if (value > Number(values.tradeContext?.fromBalance?.balance)) {
            setFieldError('token0value', t`Insufficient ${values.token0.name} balance`)
alert("HI")
        }

        if (value / Number(values?.tradeContext?.expectedConvertQuote) > Number(values?.tradeContext?.toBalance)) {
            setFieldError('token0value', t`Insufficient ${values.token1.name} balance`)
            alert("HI2")

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
        />
    )
}

