import React from 'react'
import Slider from '@components/atoms/form/range'
import setFieldValues from '../../helper/set-field-values'
import { useFormikContext } from 'formik'
import { InvestFormFields } from '../../types'

export default function InvestRangeSlider() {
    const { values, setFieldValue, dirty } = useFormikContext<InvestFormFields>()

    return (
        <div>
            <Slider
                marks={{
                    0: 'min',
                    25: '25%',
                    50: '50%',
                    75: '75%',
                    100: 'max',
                }}
                min={0}
                max={100}
                step={0.01}
                value={values.investRange}
                onChange={(value) => {
                    const investAmount = values.balance * value / 100
                    setFieldValues(setFieldValue, values, investAmount)
                    setFieldValue('investRange', value)
                }}
            />
        </div>
    )
}
