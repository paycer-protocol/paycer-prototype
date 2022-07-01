import { FormattedNumber, FormatNumberOptions } from 'react-intl';

export interface PercentageProps extends FormatNumberOptions {
  value: number;
  fractionDigits?: number;
  className?: string;
}

export const Percentage = ({ value = 0, fractionDigits = 2, ...restProps }: PercentageProps) => (
  <FormattedNumber
    value={value || 0}
    style="percent"
    minimumFractionDigits={fractionDigits}
    {...restProps}
  />
);

export default Percentage;
