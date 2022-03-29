import React from 'react'
import styled from 'styled-components'
import { ArrowDropDown } from '@styled-icons/material-outlined'
import CurrencyIcon from '@components/atoms/currency-icon'
import Icon from '@components/atoms/icon'
import { TokenType } from '../../../../types/investment'
import {t} from '@lingui/macro'
import {FormattedNumber} from '../../../atoms/number/formatted-number'

interface TokenToggleProps {
  token: TokenType
  onClick: () => void
}

export const TotalSupplyLabel = styled.small`
   font-size: 12px;

`

export default function TokenToggle(props: TokenToggleProps) {
    const { token, onClick } = props

    const yourSupply = 40000

    return (
        <div className="d-flex align-items-center cursor-pointer" onClick={onClick}>
            <CurrencyIcon
                symbol={token.symbol}
                className="me-3"
                width={32}
                height={32}
            />
            <div className="pt-2">
                <div className="d-flex align-items-center">
                    <h3 className="mb-0 text-white">{token.symbol}</h3>
                    <Icon
                        component={ArrowDropDown}
                        size={20}
                    />
                </div>
                <TotalSupplyLabel className="text-muted">
                    <span>{t`Supplied:`}</span>&nbsp;
                    <FormattedNumber
                        value={yourSupply}
                        minimumFractionDigits={2}
                        maximumFractionDigits={0}
                    />
                </TotalSupplyLabel>
            </div>
        </div>
    )
}
