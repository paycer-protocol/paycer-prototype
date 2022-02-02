import React from 'react'
import styled from 'styled-components'
import { useFormikContext } from 'formik'
import Currency from '@components/atoms/form/currency'
import { SwapProps } from '../types'
import calculateMinimumToReceive from '../../helper/minimum-to-receive'
import { useCoingeckoTokenPrice } from '@usedapp/coingecko'
import { ChainId } from '@usedapp/core'
import {t} from "@lingui/macro";
import {FormattedNumber} from "../../../../atoms/number/formatted-number";
import useToken from "@hooks/use-token";

export const TokenBalanceLabel = styled.small`
   font-size: 12px;
   padding-top:2px;
`

export default function Token1Input() {
    const { values, setFieldValue } = useFormikContext<SwapProps>()
    const tokenForBalance = useToken(values.token1.symbol)
    const { tokenBalance } = tokenForBalance
    const balance = tokenBalance()

    return (
        <div className="d-flex flex-column text-end">
            <Currency
                name="token1Value"
                required
                autoFocus
                max={10}
                currency={values.token1.symbol}
                className="border-0 bg-transparent p-0 m-0 display-4 w-100 text-light-grey fw-normal text-end no-focus"
                showCurrencyPrefix={false}
                decimals={4}
                onChange={(e) => {
                    const token1Value = Number(e.target.rawValue)
                    const token0Value = token1Value * values.token1Price
                    setFieldValue('token1Value', token1Value)
                    setFieldValue('token0Value', token0Value)
                    calculateMinimumToReceive(
                      token0Value,
                      values.token0Price,
                      values.slippageTolerance,
                      values.feeFactor,
                      setFieldValue
                    )
                }}
            />
            <TokenBalanceLabel className="text-muted">
                <span>{t`Balance:`}</span>&nbsp;
                <FormattedNumber
                    value={balance}
                    minimumFractionDigits={2}
                    maximumFractionDigits={4}
                />
            </TokenBalanceLabel>
        </div>
    )
}
