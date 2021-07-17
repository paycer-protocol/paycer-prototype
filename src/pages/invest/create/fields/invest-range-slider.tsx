import React from 'react'
import Slider from 'rc-slider'
import { useFormikContext } from 'formik'
import { InvestmentStrategy } from '@types/investment'

export default function InvestRangeSlider() {
  const { values, initialValues, setFieldValue, dirty } = useFormikContext<InvestmentStrategy>()

  return (
    <div className="mb-5 mx-2">
      <Slider
        marks={{
          0: '0%',
          25: '25%',
          50: '50%',
          75: '75%',
          100: '100%',
        }}
        min={0}
        max={100}
        step={1}
        value={dirty ? values.investRange : undefined}
        defaultValue={values.investRange * 100 / values.baseBalance}
        onChange={(value) => {
          let investAmount = 0 as number
          investAmount = values.baseBalance * value / 100

          investAmount = investAmount > initialValues.baseBalance ? initialValues.baseBalance : investAmount
          investAmount = investAmount < 0 ? 0 : investAmount

          setFieldValue('investAmount', investAmount)
          setFieldValue('investRange', value)
        }}
      />
    </div>
  )
}
