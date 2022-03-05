import React  from 'react'
import styled from 'styled-components'
import { t } from '@lingui/macro'
import Currency from '@components/atoms/form/currency'
import { CurrencyFieldProps } from '@components/atoms/form/currency'
import { FormattedNumber } from '@components/atoms/number/formatted-number'

interface TokenInputProps extends CurrencyFieldProps{
  balance?: number
  raiseMax?: boolean
  handleChange: (tokenValue: number) => void
}

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

export default function TokenInput(props: TokenInputProps) {
  const {
    currency,
    name,
    required,
    balance,
    raiseMax,
    handleChange,
    value,
    disabled
  } = props

  return (
      <div className="d-flex flex-column text-end">
        <Currency
            name={name}
            required={required}
            max={10}
            currency={currency}
            showCurrencyPrefix={false}
            decimals={4}
            autoFocus
            disabled={disabled}
            autoComplete="off"
            className="border-0 bg-transparent p-0 m-0 display-4 w-100 text-light-grey fw-normal text-end no-focus mb-1"
            onChange={(e) => {
              const tokenValue = Number(e.target.rawValue)
              handleChange(tokenValue)
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

            {(raiseMax && balance > 0) &&
            <MaxButton onClick={() => handleChange(value ? (balance + Number(value)) : balance)} className="ms-2 border-primary border rounded-1 bg-transparent cursor-pointer">
                {t`max`}
            </MaxButton>
            }
        </div>
      </div>
  )

}
