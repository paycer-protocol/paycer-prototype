import React from 'react'
import Slider from 'rc-slider'
import { FieldArray, useFormikContext } from 'formik'
import { InvestmentStrategy } from '../../../../types/investment'

export default function InvestmentAssets() {
  const { values, setFieldValue, dirty } = useFormikContext<InvestmentStrategy>()

  return (
    <div className="d-flex flex-column">
      <FieldArray
        name="assets"
        render={() => (
          <div>
            {values.assets.map((item, index) => (
              <div className="mb-4" key={`invest-dist${index}`}>
                <span className="text-muted">{item.name}</span>
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
                    const totalSum = values.assets.reduce(calculateTotalSum, 0)
                    const overflow = Math.floor((100 - totalSum) / (values.assets.length - 1))

                    setFieldValue(`assets[${index}].investRange`, value)

                    values.assets.map((item, i) => {
                      if (index !== i) {
                        if (totalSum > 100) {
                          setFieldValue(
                             `assets[${i}].investRange`,
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
