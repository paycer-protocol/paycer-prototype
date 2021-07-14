import { FormattedNumber as BaseFormattedNumber, FormatNumberOptions } from 'react-intl'


export interface FormattedNumberProps extends FormatNumberOptions {
    value: number | string;
    className?: string;
}

export const FormattedNumber = ({ value = 0, ...restProps }: FormattedNumberProps) => (
    <BaseFormattedNumber
        value={Number(value || 0)}
        style="decimal"
        {...restProps}
    />
)

export default FormattedNumber
