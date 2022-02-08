import React from 'react'
import { useFormikContext } from 'formik'
import { SwapProps } from '../types'
import calculateMinimumToReceive from '../../helper/minimum-to-receive'
import TokenInput from "@components/molecules/token-input";

export default function Token1Input() {
    const { values, setFieldValue } = useFormikContext<SwapProps>()

    const handleChange = (value:number) => {
        const token0Value = value * values.token1Price
        setFieldValue('token1Value', value)
        setFieldValue('token0Value', token0Value)
        calculateMinimumToReceive(
            token0Value,
            values.token0Price,
            values.slippageTolerance,
            values.feeFactor,
            setFieldValue
        )
    }

    return (
        <TokenInput
            name="token1Value"
            required
            currency={values.token1.symbol}
            handleChange={handleChange}
            balance={values.token1Balance}
            decimals={4}
        />
    )
}
