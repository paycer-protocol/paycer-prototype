import React from 'react'
import Currency from '@components/atoms/form/currency'
import { useFormikContext } from 'formik'
import { SupplyProps } from '../types'

export default function Token1Input() {
    const { values, setFieldValue } = useFormikContext<SupplyProps>()
    const currency = values.marketPair.pairs[1]?.symbol

    if (!currency) {
        return null
    }

    return (
        <div>
            <Currency
                name="token1Value"
                currency={currency}
                required
                max={10}
                decimals={4}
                onChange={(e) => {
                    const token1Value = Number(e.target.rawValue.split(' ')[1])
                    setFieldValue('token1Value', token1Value)
                    setFieldValue('token0Value', token1Value)
                }}
            />
        </div>
    )
}
