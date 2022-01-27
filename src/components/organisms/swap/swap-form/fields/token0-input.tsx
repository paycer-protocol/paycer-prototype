import React from 'react'
import Currency from '@components/atoms/form/currency'
import { useFormikContext } from 'formik'
import { SwapProps } from '../types'
import calculateMinimumToReceive from '../../helper/minimum-to-receive'
import { useCoingeckoTokenPrice } from '@usedapp/coingecko'
import { ChainId } from '@usedapp/core'

export default function Token0Input() {
    const { values, setFieldValue } = useFormikContext<SwapProps>()
    const token0Price = useCoingeckoTokenPrice(values.token0.chainAddresses[ChainId.Mainnet], 'usd')
    const token1Price = useCoingeckoTokenPrice(values.token1.chainAddresses[ChainId.Mainnet], 'usd')

    return (
      <>
      <Currency
        name="token0Value"
        required
        max={10}
        currency={values.token0.symbol}
        showCurrencyPrefix={false}
        decimals={4}
        className="border-0 bg-transparent p-0 m-0 display-4 w-100 text-light-grey fw-normal text-end no-focus"
        onChange={(e) => {
          const token0Value = Number(e.target.rawValue.split(' ')[1])
          const token1Value = Number(token0Value) * Number(token0Price)
          setFieldValue('token0Value', token0Value)
          setFieldValue('token1Value', token1Value)
          calculateMinimumToReceive(
            token0Value,
            token1Price,
            values.slippageTolerance,
            values.feeFactor,
            setFieldValue
          )
        }}
      />
      </>
    )
}

