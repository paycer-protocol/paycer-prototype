import { FormattedNumber, FormatNumberOptions } from 'react-intl'


export interface MoneyProps extends FormatNumberOptions {
    value: number | string;
    currency?: string;
    className?: string;
}

export const Money = ({ value = 0, currency = 'usd', ...restProps }: MoneyProps) => (
    <FormattedNumber
        value={value || 0}
        style="currency"
        currency={currency}
        {...restProps}
    />
)

export default Money
