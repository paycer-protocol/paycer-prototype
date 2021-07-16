import React from 'react'
import Slider from 'rc-slider'
import { FieldArray, useFormikContext } from 'formik'
import { CreateInvestProps } from '../types'

export default function InvestmentDistribution() {
  const { values, initialValues, setFieldValue, dirty } = useFormikContext<CreateInvestProps>()

  return (
    <div className="d-flex flex-column">
      <FieldArray
        name="investmentDistribution"
        render={() => (
          <div>
            {values.investmentDistribution.map((item, index) => (
              <div className="mb-4" key={`invest-dist${index}`}>
                <span className="text-muted">{item.investName}</span>
                <div className="d-flex align-items-center">
                <span className="me-3">
                  {item.investRange}%
                </span>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={dirty ? item.investRange : undefined}
                  defaultValue={item.investRange}
                  onChange={(value) => {
                    setFieldValue(`investmentDistribution[${index}].investRange`, value)

                    // todo

                    console.log((100 - value) / (values.investmentDistribution.length - 1), value,)

                    initialValues.investmentDistribution.map((item, i) => {
                      if (index !== i) {
                        setFieldValue(`investmentDistribution[${i}].investRange`, item.investRange )
                      }
                    })
                  }}
                />
                </div>
              </div>
            ))}
          </div>
        )}
      />
    </div>
  )
}
