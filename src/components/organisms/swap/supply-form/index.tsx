import React from 'react'
import { t } from '@lingui/macro'
import * as Styles from '../Styles'
import * as Yup from 'yup'
import Form from '@components/atoms/form/form'
import { SupplyProps } from './types'

export default function SupplyForm() {

  const initialValues: SupplyProps = {
    fromValue: 0,
    toValue: 0,
    currencyPair: {},
  }

  const validationSchema = Yup.object().shape({
    firstCurrency: Yup.number().min(0).required(),
    secondCurrency: Yup.number().min(0).required(),
  })

  const handleSubmit = (values: SupplyProps) => {
    console.log(values)
  }

  return (
      <Form
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
      >
        {({ }) => {
          return (
              <div className="d-flex">
                <Styles.LeftCol>
                  <div className="d-flex flex-column flex-md-row">
                    <div className="w-100">
                      <Styles.CurrencyInputLabel>
                        {t`Supply`}
                      </Styles.CurrencyInputLabel>

                      <div className="d-flex flex-column flex-md-row">
                        <div className="w-100 me-4">

                        </div>
                        <div className="w-100">

                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-center">
                    <Styles.StyledButton className="btn">
                      {t`Supply`}
                    </Styles.StyledButton>
                  </div>
                </Styles.LeftCol>

                <Styles.VerticalLine />

                <Styles.RightCol>

                </Styles.RightCol>
              </div>
          )
        }}
      </Form>
  )
}
