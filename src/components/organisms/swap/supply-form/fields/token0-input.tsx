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
        max={values.token0Balance}
        currency={values.marketPair.token0.symbol}
        decimals={4}
        onChange={(e) => {
            const value  = Number(e.target.rawValue.split(' ')[1])
            // force max balance if input too high TODO: Doesnt update the input display value correctly after it was forced to the users total balance for some reason...
            const token0Value = value > values.token0Balance ? values.token0Balance : value

            setFieldValue('token0Value', token0Value)

            // TODO: how to calculate token1value if token1balance not enough to fit the exchange value from token0
            const token1Value = token0Value * values.exchangeRate

            setFieldValue('token1Value', token1Value)
            /* TODO CALCULATE DAILY REWARDS */
            setFieldValue('dailyRewards', (token0Value / 100000000) * 75000)
        }}
      />
    )
}

