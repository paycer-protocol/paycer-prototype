import React from 'react'
import { useFormikContext } from 'formik'
import { SupplyProps } from '../types'
import { useCoingeckoTokenPrice } from '@usedapp/coingecko'
import { ChainId } from '@usedapp/core'
import useToken from "@hooks/use-token";
import TokenInput from "@components/molecules/token-input";

export default function Token0Input() {
    const { values, setFieldValue } = useFormikContext<SupplyProps>()
    let token0Price = Number(useCoingeckoTokenPrice(values.token0.chainAddresses[ChainId.Polygon], 'usd', 'polygon-pos'))
    let token1Price = Number(useCoingeckoTokenPrice(values.token1.chainAddresses[ChainId.Polygon], 'usd', 'polygon-pos'))
    const token0TotalSupply = useToken(values.token0.symbol).totalSupply
    const token1TotalSupply = useToken(values.token1.symbol).totalSupply

    if (values.token0.symbol === 'PCR') {
        token0Price = 0.06182
    }

    if (values.token1.symbol === 'PCR') {
        token1Price = 0.06182
    }

    const handleChange = (value: number) => {
        const token1Value = Number(value) / token1Price
        const apr = values.apr
        const token0valueInUSD = value * token0Price
        const token1valueInUSD = token1Value * token1Price
        setFieldValue('dailyRewards', (token0valueInUSD + token1valueInUSD) / 100 * apr)

        setFieldValue('token0Value', value)
        setFieldValue('token1Value', token1Value)
    }

    return (
        <TokenInput
            name="token0Value"
            required
            currency={values.token0.symbol}
            handleChange={handleChange}
            balance={values.token0Balance}
            decimals={4}
        />
    )
}

