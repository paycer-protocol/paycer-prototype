import { useField } from 'formik'
import React, { FC } from 'react'
import Cleave from 'cleave.js/react'
import useChange from './useChange'
import Group from './group'
import { FormInputFieldProps } from './types'

interface CurrencyFieldProps extends FormInputFieldProps {
    currency: string;
    decimals: number;
}

const Currency: FC<CurrencyFieldProps> = ({ label, helpText, currency, decimals = 2, ...props }: CurrencyFieldProps) => {
    const [{ name, value, onBlur }, { error, touched }] = useField(props)
    const handleChange = useChange(props)

    return (
        <Group
            name={name}
            controlId={name}
            label={label}
            helpText={helpText}
            error={error}
        >
            <Cleave
                {...props}
                name={name}
                key={currency}
                value={value?.toString()}
                isInvalid={Boolean(error) && touched}
                className="form-control"
                onChange={handleChange}
                onBlur={onBlur}
                spellCheck="false"
                options={{
                    numeral: true,
                    numeralThousandsGroupStyle: 'thousand',
                    prefix: currency + ' ',
                    numeralDecimalScale: decimals,
                    max: 10,
                }}
            />
        </Group>
    )
}

export default Currency
