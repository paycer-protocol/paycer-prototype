import React from 'react'
import Currency from '@components/atoms/form/currency'
import { useFormikContext } from 'formik'
import { SwapProps } from '../../types'

export default function FromInput() {
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
                    const exchangeRateTo = 1.37
                    const toValue = fromValue * exchangeRateTo

                    setFieldValue('fromValue', fromValue)

                    //TODO CALL CHAINLINKK API
                    if (values.slippageTolerance) {
                        const slippageTolerance = values.slippageTolerance
                        const slippageToleranceResult = toValue * slippageTolerance / 100
                        setFieldValue('toValue', toValue - slippageToleranceResult)
                    } else {
                        setFieldValue('toValue', toValue)
                    }
                }}
            />
        </div>
    )
}

