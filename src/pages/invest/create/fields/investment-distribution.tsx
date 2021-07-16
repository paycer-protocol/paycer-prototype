import React from 'react'
import Slider from 'rc-slider'
import { FieldArray, useFormikContext } from 'formik'
import { CreateInvestProps } from '../types'

export default function InvestmentDistribution() {
  const { values, setFieldValue, dirty } = useFormikContext<CreateInvestProps>()

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

                    const calculateTotalSum = (prevVal, nextVal, i) => prevVal + (index === i ? value : nextVal.investRange)
                    const totalSum = values.investmentDistribution.reduce(calculateTotalSum, 0)
                    const overflow = Math.floor((100 - totalSum) / (values.investmentDistribution.length - 1))

                    setFieldValue(`investmentDistribution[${index}].investRange`, value)

                    values.investmentDistribution.map((item, i) => {
                      if (index !== i) {
                        if (totalSum > 100) {
                          setFieldValue(
                             `investmentDistribution[${i}].investRange`,
                             Math.abs(item.investRange + overflow)
                           )
                        }
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
