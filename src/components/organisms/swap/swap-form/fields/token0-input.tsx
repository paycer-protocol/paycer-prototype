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
import TokenInput from '@components/molecules/token-input'

export const TokenBalanceLabel = styled.small`
   font-size: 12px;
   padding-top:2px;
`

export const MaxButton = styled.small`
    font-size: 9px;
    padding: 0 4px;
    line-height: 15px;
    position: relative;
    top: 2px;
    font-weight: 400;
    height: 17px; &:hover { border-color #365172!important; }
`

export default function Token0Input() {
    const { values, setFieldValue } = useFormikContext<SwapProps>()

    const handleChange = (value:number) => {
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
        <TokenInput
            name="token0Value"
            required
            currency={values.token0.symbol}
            handleChange={handleChange}
            raiseMax
            balance={values.token0Balance}
            decimals={4}
        />
    )
}

