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
                name="toValue"
                required
                max={10}
                currency={values.toCurrency}
                decimals={4}
                onChange={(e) => {
                    const toValue = Number(e.target.rawValue.split(' ')[1])
                    setFieldValue('toValue', toValue)
                    //TODO CALL CHAINLINKK API
                    setFieldValue('fromValue', toValue + 22)
                }}
            />
        </div>
    )
}
