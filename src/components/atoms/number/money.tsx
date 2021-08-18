import React from 'react'
import { FormattedNumber, FormatNumberOptions } from 'react-intl'
import CurrencyIcon from '@components/atoms/currency-icon'

export interface MoneyProps extends FormatNumberOptions {
    value: number | string;
    currency?: string;
    className?: string;
    withIcon?: boolean;
}

export const Money = ({ withIcon = false, value = 0, currency = 'usd', ...restProps }: MoneyProps) => (
    <>
        <FormattedNumber
            value={Number(value || 0)}
            style="currency"
            currency={currency}
            {...restProps}
        />
        {(withIcon &&
            <CurrencyIcon
              symbol={currency}
              width={28}
              height={28}
              className="ms-2"
              style={{marginTop: '-4px'}}
            />
        )}
    </>
)

export default Money
