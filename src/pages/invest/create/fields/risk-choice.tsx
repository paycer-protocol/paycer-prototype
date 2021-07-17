import React from 'react'
import {defineMessage, t, Trans} from '@lingui/macro'
import { useFormikContext } from 'formik'
import Form from '@components/atoms/form'
import Button from '@components/atoms/button'
import { RiskLevel, InvestmentStrategy } from '@types/investment'
import { investmentStrategies } from '@config/investment/strategies'

const riskLabels = {
    [RiskLevel.Low]: defineMessage({ message: 'Low' }),
    [RiskLevel.Medium]: defineMessage({ message: 'Medium' }),
    [RiskLevel.High]: defineMessage({ message: 'High' }),
}

export default function RiskChoice() {
    const { values, setFieldValue } = useFormikContext<InvestmentStrategy>()

    const handleChange = (risk) => {
      setFieldValue('riskLevel', risk)

      const qualifiedStrategy = investmentStrategies.find((item) => Number(item.riskLevel) == Number(risk))
      if (qualifiedStrategy) {
        setFieldValue('assets', qualifiedStrategy.assets)
      }

    }

    return (
      <Form.Group name="riskLevel" label={t`Risk`} className="mb-5">
          <div className="d-flex align-items-center">
              {[RiskLevel.Low, RiskLevel.Medium, RiskLevel.High].map((risk) => (
                <Button
                  key={`risk${risk}`}
                  variant="outline-primary"
                  active={values.riskLevel === risk}
                  onClick={() => handleChange(risk)}
                  size="sm"
                  className="me-3"
                >
                    <Trans id={riskLabels[risk].id}/>
                </Button>
              ))}
          </div>
      </Form.Group>
    )
}
