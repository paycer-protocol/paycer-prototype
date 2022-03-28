import React from 'react'
import { useFormikContext } from 'formik'
import { SwapProps, SwapTokenInputProps } from '../types'
import TokenInput from '@components/molecules/token-input'

export default function Token1Input(props: SwapTokenInputProps) {
    const { readOnly } = props
    const { values, setValues, setFieldValue, setFieldError } = useFormikContext<SwapProps>()

    const handleChange = async (value: number) => {

    }

    return (
        <TokenInput
            name="token1Value"
            disabled={!values.token0 || !values.token1}
            required
            currency={values.token1.symbol}
            handleChange={handleChange}
            decimals={6}
            readOnly={values.isLoading || readOnly}
        />
    )
}
