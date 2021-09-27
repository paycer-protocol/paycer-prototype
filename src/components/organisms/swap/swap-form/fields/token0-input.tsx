import React from 'react'
import Currency from '@components/atoms/form/currency'
import { useFormikContext } from 'formik'
import { SwapProps } from '../../types'
import calculateMinimumToReceive from '../../helper/minimum-to-receive'

export default function Token0Input() {
    const { values, setFieldValue } = useFormikContext<SwapProps>()

    return (
      <Currency
        name="token0Value"
        required
        max={10}
        currency={values.token0}
        decimals={4}
        onChange={(e) => {
          const token0Value = Number(e.target.rawValue.split(' ')[1])
          const token1Value = token0Value * values.exchangeRate
          setFieldValue('token0Value', token0Value)
          setFieldValue('token1Value', token1Value)
          calculateMinimumToReceive(
            token0Value,
            values.exchangeRate,
            values.slippageTolerance,
            values.feeFactor,
            setFieldValue
          )
        }}
      />
    )
}

