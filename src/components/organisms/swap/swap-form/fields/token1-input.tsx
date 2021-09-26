import React from 'react'
import Currency from '@components/atoms/form/currency'
import { useFormikContext } from 'formik'
import { SwapProps } from '../../types'
import calculateMinimumToReceive from "@components/organisms/swap/helper/minimum-to-receive";

export default function Token1Input() {
    const {
        values,
        setFieldValue
    } = useFormikContext<SwapProps>()

    return (
        <div>
            <Currency
                name="token1Value"
                required
                max={10}
                currency={values.token1}
                decimals={4}
                onChange={(e) => {
                    const token1Value = Number(e.target.rawValue.split(' ')[1])
                    const token0Value = token1Value / values.exchangeRate
                    setFieldValue('token1Value', token1Value)
                    setFieldValue('token0Value', token0Value)
                    calculateMinimumToReceive(token0Value, values.exchangeRate, values.slippageTolerance, values.feeFactor, setFieldValue)
                }}
            />
        </div>
    )
}
