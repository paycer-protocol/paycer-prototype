import React from 'react'
import Currency from '@components/atoms/form/currency'
import { useFormikContext } from 'formik'
import { SupplyProps } from '../types'

export default function CurrencyInput({name}) {
    const {
        values,
        setFieldValue,
    } = useFormikContext<SupplyProps>()

    return (
        <div>
            <Currency
                name={name}
                required
                max={10}
                currency={values[name]}
                decimals={4}
                onChange={(e) => {

                }}
            />
        </div>
    )
}

