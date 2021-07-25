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
        <FormattedNumber
            value={Number(value || 0)}
            style="currency"
            currency={currency}
            {...restProps}
        />
        {(withIcon &&
          <img width="28" className="ms-2" style={{marginTop: '-4px'}} src={`assets/icons/${normalizeFilename(currency)}.svg`} alt={currency} />
        )}
    </>
)

export default Money
