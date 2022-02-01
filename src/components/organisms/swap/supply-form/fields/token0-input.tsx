import React from 'react'
import styled from 'styled-components'
import Currency from '@components/atoms/form/currency'
import { useFormikContext } from 'formik'
import { SwapProps } from '../types'
import calculateMinimumToReceive from '../../helper/minimum-to-receive'
import { useCoingeckoTokenPrice } from '@usedapp/coingecko'
import { ChainId } from '@usedapp/core'
import {FormattedNumber} from "../../../../atoms/number/formatted-number";
import {t} from "@lingui/macro";

export const TokenBalanceLabel = styled.small`
   font-size: 11px;
   padding-top:2px;
`

export default function Token0Input() {
    const { values, setFieldValue } = useFormikContext<SwapProps>()
    let token0Price = Number(useCoingeckoTokenPrice(values.token0.chainAddresses[ChainId.Polygon], 'usd', 'polygon-pos'))
    let token1Price = Number(useCoingeckoTokenPrice(values.token1.chainAddresses[ChainId.Polygon], 'usd', 'polygon-pos'))

    if (values.token0.symbol === 'PCR') {
        token0Price = 0.06182
    }

    if (values.token1.symbol === 'PCR') {
        token1Price = 0.06182
    }


    return (
      <div className="d-flex flex-column text-end">
          <Currency
            name="token0Value"
            required
            max={10}
            currency={values.token0.symbol}
            showCurrencyPrefix={false}
            decimals={4}
            className="border-0 bg-transparent p-0 m-0 display-4 w-100 text-light-grey fw-normal text-end no-focus"
            onChange={(e) => {
              const token0Value = Number(e.target.rawValue)
              const token1Value = Number(token0Value) / token1Price
              setFieldValue('token0Value', token0Value)
              setFieldValue('token1Value', token1Value)
            }}
          />
          <TokenBalanceLabel className="text-muted">
              <span>{t`Balance:`}</span>&nbsp;
              <FormattedNumber
                  value={values.token0Balance}
                  minimumFractionDigits={2}
                  maximumFractionDigits={4}
              />
          </TokenBalanceLabel>
      </div>
    )
}

