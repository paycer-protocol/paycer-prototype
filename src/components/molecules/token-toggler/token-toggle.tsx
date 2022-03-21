import React from 'react'
import styled from 'styled-components'
import { ArrowDropDown } from '@styled-icons/material-outlined'
import CurrencyIcon from '@components/atoms/currency-icon'
import Icon from '@components/atoms/icon'
import { TokenType } from '../../../types/investment'
import { t } from '@lingui/macro'

export const Placeholder = styled.span`
   font-size: 16px; font-weight: 300;
`

interface TokenToggleProps {
  token: TokenType
  onClick: () => void
  placeholder: string
  label?: string
  readOnly?: boolean
}

export default function TokenToggle(props: TokenToggleProps) {
  const { token, onClick, placeholder, label, readOnly } = props
  return (
    <div className="d-flex align-items-center cursor-pointer" onClick={!readOnly ? onClick : null}>
        {token &&
            <CurrencyIcon
              symbol={token.symbol}
              className="me-3"
              width={32}
              height={32}
            />
        }

        <div>
            {(label && !readOnly) &&
                <small style={{paddingBottom: '1px'}} className="text-muted d-block fw-lighter">{label}</small>
            }
            <div className="d-flex align-items-center">
                {token ?
                  <h3 className="mb-0 text-white">{token.symbol}</h3>
                  :
                  <Placeholder>{placeholder}</Placeholder>
                }
                {!readOnly &&
                    <Icon
                        component={ArrowDropDown}
                        size={20}
                    />
                }

            </div>
        </div>

    </div>
  )
}
