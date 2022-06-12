import React, {useEffect} from 'react'
import { useFormikContext } from 'formik'
import { SwapProps, SwapTokenInputProps } from '../types'
import TokenInput from '@components/molecules/token-input'
import useToken from "@hooks/use-token";
import useSwap from "@hooks/use-swap"
import {formatUnits } from "@ethersproject/units"

export default function Token0Input(props: SwapTokenInputProps) {
    const { readOnly } = props
    const { values, setValues, setFieldValue, setFieldError } = useFormikContext<SwapProps>()
    const { tokenBalance: balance} = useToken(values?.fromToken?.symbol)

    const {
        fetchQuote
    } = useSwap()

    const handleChange = async (value: number) => {
        setFieldValue('fromTokenValue', value)
        if (values.toToken && value) {
            setFieldValue('isLoading', true)
            try {
                const result = await fetchQuote({ fromToken: values.fromToken, toToken: values.toToken, amount: value.toString() })
                const toTokenValue = formatUnits(result?.toTokenAmount.toString(), values.toToken.decimals)
                setFieldValue('estimatedGasFee', result?.estimatedGas)
                setFieldValue('toTokenValue', toTokenValue)
                setFieldValue('isLoading', false)
            } catch(e) {
                setFieldValue('isLoading', false)
                console.log(e.message)
            }
        }
    }

    useEffect(() => {

        if (!values.toToken || !values.fromTokenValue || !values.fromToken) {
            return
        }

        const fetch = async () => {
            setFieldValue('isLoading', true)
            try {
                const result = await fetchQuote({ fromToken: values.fromToken, toToken: values.toToken, amount: values.fromTokenValue.toString() })
                const toTokenValue = formatUnits(result?.toTokenAmount.toString(), values.toToken.decimals)
                if (toTokenValue !== values.toTokenValue.toString()) {
                    setFieldValue('toTokenValue', toTokenValue)
                    setFieldValue('estimatedGasFee', result?.estimatedGas)
                }
                setFieldValue('isLoading', false)
            } catch(e) {
                setFieldValue('isLoading', false)
                console.log(e.message)
            }
        }

        const interval = setInterval(() => {
            fetch()
        }, 5000)
        return () => clearInterval(interval)
    }, [values?.toTokenValue, values?.fromTokenValue, values?.fromTokenValue])

    return (
        <TokenInput
            name="fromTokenValue"
            disabled={!values?.fromToken && !values?.toToken}
            required
            currency={values?.fromToken?.symbol}
            handleChange={handleChange}
            raiseMax
            balance={balance}
            decimals={6}
            readOnly={values.isLoading || readOnly}
        />
    )
}

