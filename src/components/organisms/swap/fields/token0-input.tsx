import React from 'react'
import { useFormikContext } from 'formik'
import { SwapProps, SwapTokenInputProps } from '../types'
import TokenInput from '@components/molecules/token-input'
import useToken from "@hooks/use-token";
import useSwap from "@hooks/use-swap_";
import {formatUnits, parseUnits} from "@ethersproject/units";

export default function Token0Input(props: SwapTokenInputProps) {
    const { readOnly } = props
    const { values, setValues, setFieldValue, setFieldError } = useFormikContext<SwapProps>()
    const { tokenBalance: balance} = useToken(values?.fromToken?.symbol)

    const {
        isLoading,
        fetchQuote,
    } = useSwap()

    const handleChange = async (value: number) => {
        if (values.toToken && value) {
            const result = await fetchQuote({ fromToken: values.fromToken, toToken: values.toToken, amount: value.toString() })
            setFieldValue('toTokenValue', formatUnits(result?.toTokenAmount.toString(), values.toToken.decimals))
        }
    }

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
            readOnly={isLoading || readOnly}
        />
    )
}

