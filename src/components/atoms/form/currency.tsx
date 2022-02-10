import { useField } from 'formik'
import React, { FC } from 'react'
import Cleave from 'cleave.js/react'
import useChange from './useChange'
import Group from './group'
import { FormInputFieldProps } from './types'

export interface CurrencyFieldProps extends FormInputFieldProps {
    currency: string
    decimals: number
    showCurrencyPrefix?: boolean
}

const Currency: FC<CurrencyFieldProps> = ({ label, helpText, currency, decimals = 2, showCurrencyPrefix = true,  ...props }: CurrencyFieldProps) => {
    const [{ name, value, onBlur }, { error, touched }] = useField(props)
    const handleChange = useChange(props)

    const { className } = props

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
                className={`${className}`}
                onChange={handleChange}
                onBlur={onBlur}
                spellCheck="false"
                placeholder="0.00"
                options={{
                    numeral: true,
                    numeralThousandsGroupStyle: 'thousand',
                    prefix: showCurrencyPrefix ? currency + ' ' : null,
                    numeralDecimalScale: decimals,
                    max: 10,
                }}
            />
        </Group>
    )
}

export default Currency
