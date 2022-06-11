import React from 'react'
import { useFormikContext } from 'formik'
import { SwapProps, SwapTokenInputProps } from '../types'
import TokenInput from '@components/molecules/token-input'
import useToken from "@hooks/use-token";

export default function Token1Input(props: SwapTokenInputProps) {
    const { values, setValues, setFieldValue, setFieldError } = useFormikContext<SwapProps>()
    const { tokenBalance: balance} = useToken(values?.toToken?.symbol)

    return (
        <TokenInput
            readOnly
            name="toTokenValue"
            disabled={!values?.fromToken && !values?.toToken}
            required
            currency={values?.toToken?.symbol}
            raiseMax
            balance={balance}
            decimals={6}
        />
    )
}
