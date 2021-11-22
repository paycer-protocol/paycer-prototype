import React from 'react'
import {ChevronDown} from '@styled-icons/bootstrap'
import * as Styles from '@components/organisms/swap/Styles'
import CurrencyIcon from '@components/atoms/currency-icon'
import Icon from '@components/atoms/icon'
import { TokenType } from '../../../../types/investment'

interface TokenToggleProps {
  token: TokenType
  onClick: () => void
}

export default function TokenToggle(props: TokenToggleProps) {
  const { token, onClick } = props
  return (
    <Styles.SelectWrapper onClick={onClick}>
      <CurrencyIcon
        symbol={token.symbol}
        className="me-3"
        width={30}
        height={30}
      />
      <Styles.TokenToggle>
        {token.symbol}
      </Styles.TokenToggle>
      <Icon
        component={ChevronDown}
        size={20}
        style={{ fontWeight: 'bold' }}
      />
    </Styles.SelectWrapper>
  )
}
