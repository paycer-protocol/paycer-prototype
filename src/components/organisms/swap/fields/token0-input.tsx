import React from 'react'
import { useFormikContext } from 'formik'
import { SwapProps, SwapTokenInputProps } from '../types'
import TokenInput from '@components/molecules/token-input'
import useToken from "@hooks/use-token";
import useSwap from "@hooks/use-swap_";

export default function Token0Input(props: SwapTokenInputProps) {
    const { readOnly } = props
    const { values, setValues, setFieldValue, setFieldError } = useFormikContext<SwapProps>()
    const { tokenBalance: balance} = useToken(values?.fromToken?.symbol)
    const {
        isLoading,
        fetchQuote,
    } = useSwap()

    const handleChange = async (value: number) => {
        fetchQuote({ fromToken: values.fromToken, toToken: values.toToken, amount: values.toString() })
    }
   
    return (
        <TokenInput
            name="token0Value"
            disabled={!values?.fromToken || !values?.toToken}
            required
            currency={values?.fromToken?.symbol}
            handleChange={handleChange}
            raiseMax
            balance={balance}
            decimals={5}
            readOnly={isLoading || readOnly}
        />
    )
}

