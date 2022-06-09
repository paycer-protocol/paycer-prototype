import React from 'react'
import { useFormikContext } from 'formik'
import { SwapProps, SwapTokenInputProps } from '../types'
import TokenInput from '@components/molecules/token-input'
import useSwap from "@hooks/use-swap_";
import useToken from "@hooks/use-token";

export default function Token1Input(props: SwapTokenInputProps) {
    const { readOnly } = props
    const { values, setValues, setFieldValue, setFieldError } = useFormikContext<SwapProps>()
    const { tokenBalance: balance} = useToken(values?.toToken?.symbol)

    const {
        isLoading,
        fetchQuote
    } = useSwap()

    const handleChange = async (value: number) => {
        fetchQuote({ fromToken: values.fromToken, toToken: values.toToken, amount: values.fromTokenValue.toString() })
    }

    return (
        <TokenInput
            name="token1Value"
            disabled={!values?.fromToken || !values?.toToken}
            required
            currency={values?.toToken?.symbol}
            handleChange={handleChange}
            balance={balance}
            decimals={6}
            readOnly={isLoading || readOnly}
        />
    )
}
