import React from 'react'
import { ArrowDropDown } from '@styled-icons/material-outlined'
import CurrencyIcon from '@components/atoms/currency-icon'
import Icon from '@components/atoms/icon'
import { TokenType } from '../../../../../types/investment'

interface TokenToggleProps {
  token: TokenType
  label: string
  onClick: () => void
}

export default function TokenToggle(props: TokenToggleProps) {
  const { token, onClick, label } = props
  return (
    <div className="d-flex align-items-center cursor-pointer" onClick={onClick}>
        <CurrencyIcon
            symbol={token.symbol}
            className="me-3"
            width={32}
            height={32}
        />
        <div>
            <small className="text-muted d-block fw-lighter">{label}</small>
            <div className="d-flex align-items-center">
                <h3 className="mb-0 text-white">{token.symbol}</h3>
                <Icon
                    component={ArrowDropDown}
                    size={20}
                />
            </div>
        </div>
    </div>
  )
}
