import React from 'react'
import { useFormikContext } from 'formik'
import { SwapProps, SwapTokenInputProps } from '../types'
import TokenInput from '@components/molecules/token-input'
import {t} from '@lingui/macro'

export default function Token0Input(props: SwapTokenInputProps) {
    const { readOnly } = props
    const { values, setValues, setFieldValue, setFieldError } = useFormikContext<SwapProps>()

    const handleChange = async (value: number) => {
        setFieldValue('quoteChangedState', null)
        let validate = true

        if (value > Number(values.tradeContext?.fromBalance?.balance)) {
            setFieldError('token0value', t`Insufficient ${values.token0.name} balance`)
            validate = false
        }

        const nextValues = {
            ...values,
            ... {
                token0Value: value,
                // this makes no sense but without meta mask error, check another comment at bottom
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
            //... this makes sense
            setFieldValue('token1Value', value ? nextTradeContext.expectedConvertQuote : 0)
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
            readOnly={values.isLoading || readOnly}
        />
    )
}

