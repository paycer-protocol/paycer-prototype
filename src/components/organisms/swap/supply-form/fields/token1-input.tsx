import React from 'react'
import { useFormikContext } from 'formik'
import { SupplyProps } from '../types'
import { useCoingeckoTokenPrice } from '@usedapp/coingecko'
import { ChainId } from '@usedapp/core'
import TokenInput from "@components/molecules/token-input";


export default function Token1Input() {
    const { values, setFieldValue } = useFormikContext<SupplyProps>()
    let token0Price = Number(useCoingeckoTokenPrice(values.token0.chainAddresses[ChainId.Polygon], 'usd', 'polygon-pos'))
    let token1Price = Number(useCoingeckoTokenPrice(values.token1.chainAddresses[ChainId.Polygon], 'usd', 'polygon-pos'))

    if (values.token0.symbol === 'PCR') {
        token0Price = 0.06182
    }

    if (values.token1.symbol === 'PCR') {
        token1Price = 0.06182
    }

    const handleChange = (value: number) => {
        const token0Value = value * token1Price

        const apr = values.apr
        const token0valueInUSD = token0Value * token0Price
        const token1valueInUSD = value * token1Price
        setFieldValue('dailyRewards', (token0valueInUSD + token1valueInUSD) / 100 * apr / 365)

        setFieldValue('token1Value', value)
        setFieldValue('token0Value', token0Value)
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
