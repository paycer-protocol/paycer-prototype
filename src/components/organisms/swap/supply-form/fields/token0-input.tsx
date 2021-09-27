import React from 'react'
import Currency from '@components/atoms/form/currency'
import { useFormikContext } from 'formik'
import { SupplyProps } from '../types'

export default function Token1Input() {
    const { values, setFieldValue } = useFormikContext<SupplyProps>()
    const currency = values.marketPair.pairs[0]?.symbol

    if (!currency) {
        return null
    }

    return (
        <div>
            <Currency
                name="token0Value"
                currency={currency}
                required
                max={10}
                decimals={4}
                onChange={(e) => {
                    const token0Value = Number(e.target.rawValue.split(' ')[1])
                    setFieldValue('token0Value', token0Value)
                    setFieldValue('token1Value', token0Value)
                }}
            />
        </div>
    )
}
