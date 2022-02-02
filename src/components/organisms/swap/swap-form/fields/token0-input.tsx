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
import useToken from "@hooks/use-token";

export const TokenBalanceLabel = styled.small`
   font-size: 12px;
   padding-top:2px;
`

export const MaxButton = styled.small`
   font-size: 10px;
   padding: 0 4px; line-height: 16px;
`

export default function Token0Input() {
    const { values, setFieldValue } = useFormikContext<SwapProps>()
    const tokenForBalance = useToken(values.token0.symbol)
    const { tokenBalance } = tokenForBalance
    const balance = tokenBalance()

    const handleChange = (value:number) => {
        // todo fetch prices

        const token1Value = Number(value) / values.token1Price
        setFieldValue('token0Value', value)
        setFieldValue('token1Value', token1Value)
        calculateMinimumToReceive(
            value,
            token1Value,
            values.slippageTolerance,
            values.feeFactor,
            setFieldValue
        )
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
              handleChange(token0Value)
            }}
          />
          <div className="d-flex justify-content-end">
              <TokenBalanceLabel className="text-muted">
                  <span>{t`Balance:`}</span>&nbsp;
                  <FormattedNumber
                      value={balance}
                      minimumFractionDigits={2}
                      maximumFractionDigits={4}
                  />
              </TokenBalanceLabel>
              {(balance > 0) &&
              <MaxButton onClick={() => handleChange(balance)} className="ms-2 border-primary border rounded-2 bg-transparent">
                max
              </MaxButton>
              }
          </div>

      </div>
    )
}

