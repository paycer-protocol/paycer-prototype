import React from 'react'
import Currency from '@components/atoms/form/currency'
import { useFormikContext } from 'formik'
import { SwapProps } from '../../types'

export default function FromSelect() {
    const {
        values,
        setFieldValue
    } = useFormikContext<SwapProps>()

    return (
        <div>
            <Currency
                name="fromValue"
                required
                max={10}
                currency={values.fromCurrency}
                decimals={4}
                onChange={(e) => {
                    const fromValue = Number(e.target.rawValue.split(' ')[1])
                    setFieldValue('fromValue', fromValue)
                    //TODO CALL CHAINLINKK API
                    setFieldValue('toValue', fromValue + 22)
                }}
            />
        </div>
    )
}
