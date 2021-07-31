import { FormattedNumber, FormatNumberOptions } from 'react-intl'
import {normalizeFilename} from "../../../helper/filename";
import React from "react";


export interface MoneyProps extends FormatNumberOptions {
    value: number | string;
    currency?: string;
    className?: string;
    withIcon?: boolean;
}

export const Money = ({ withIcon = false, value = 0, currency = 'usd', ...restProps }: MoneyProps) => (
    <>
        {(withIcon &&
          <img width="28" className="me-2" style={{marginTop: '-4px'}} src={`assets/icons/${normalizeFilename(currency)}.svg`} alt={currency} />
        )}
        <FormattedNumber
            value={Number(value || 0)}
            style="currency"
            currency={currency}
            {...restProps}
        />
    </>
)

export default Money
