import React from 'react'
import { useFormikContext } from 'formik'
import Currency from '@components/atoms/form/currency'
import { SwapProps } from '../../types'
import calculateMinimumToReceive from '../../helper/minimum-to-receive'
import { useCoingeckoTokenPrice } from '@usedapp/coingecko'
import { ChainId } from '@usedapp/core'

export default function Token1Input() {
    const { values, setFieldValue } = useFormikContext<SwapProps>()
    const token0Price = useCoingeckoTokenPrice(values.token0.chainAddresses[ChainId.Mainnet], 'usd')
    const token1Price = useCoingeckoTokenPrice(values.token1.chainAddresses[ChainId.Mainnet], 'usd')

    return (
        <div>
            <Currency
                name="token1Value"
                required
                max={10}
                currency={values.token1.symbol}
                decimals={4}
                onChange={(e) => {
                    const token1Value = Number(e.target.rawValue.split(' ')[1])
                    const token0Value = token1Value / token0Price
                    setFieldValue('token1Value', token1Value)
                    setFieldValue('token0Value', token0Value)
                    calculateMinimumToReceive(
                      token0Value,
                      token0Price,
                      values.slippageTolerance,
                      values.feeFactor,
                      setFieldValue
                    )
                }}
            />
        </div>
    )
}
