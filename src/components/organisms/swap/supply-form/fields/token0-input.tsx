import React from 'react'
import Currency from '@components/atoms/form/currency'
import { useFormikContext } from 'formik'
import { SupplyProps } from "@components/organisms/swap/supply-form/types";

export default function Token0Input() {
    const { values, setFieldValue } = useFormikContext<SupplyProps>()

    return (
      <Currency
        name="token0Value"
        required
        max={10}
        currency={values.marketPair.token0.symbol}
        decimals={4}
        onChange={(e) => {
          const token0Value = Number(e.target.rawValue.split(' ')[1])
          const token1Value = token0Value * values.exchangeRate
          setFieldValue('token0Value', token0Value)
          setFieldValue('token1Value', token1Value)
          /* TODO CALCULATE DAILY REWARDS */
          setFieldValue('dailyRewards', (token0Value / 100000000) * 75000)
        }}
      />
    )
}

