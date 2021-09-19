import React from 'react'
import { t } from '@lingui/macro'
import * as Styles from './Styles'
import * as Yup from 'yup'
import Form from '@components/atoms/form/form'
import SubmitButton from './fields/submit-button'
import { SupplyProps } from './types'
import CurrencyInput from './fields/currency-input';
import CurrencyPairSelect from './fields/currency-pair-select';

export default function SupplyForm() {

  const initialValues: SupplyProps = {
    firstCurrency: 0,
    secondCurrency: 0,
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
              <div className="w-50">
                <Styles.CurrencyInputLabel>
                  {t`Supply Liquidity`}
                </Styles.CurrencyInputLabel>

                <Styles.HorizontalLine className="d-block" />

                <div className="d-flex flex-column flex-md-row">
                  <div className="w-100">
                    <Styles.CurrencyInputLabel>
                      {t`Swap from`}
                    </Styles.CurrencyInputLabel>
                    <div className="d-flex flex-column flex-md-row">
                      <div className="w-100">
                        <CurrencyPairSelect />
                      </div>
                    </div>

                    <Styles.HorizontalLine className="d-block" />
                    <Styles.CurrencyInputLabel>
                      {t`Swap to`}
                    </Styles.CurrencyInputLabel>
                    <div className="">
                      <CurrencyInput name="firstCurrency" />
                      <CurrencyInput name="secondCurrency" />
                    </div>
                  </div>
                </div>
                <SubmitButton />
              </div>

              <Styles.VerticalLine />

              <div className="w-50">
                TBD
              </div>
          </div>
        )
      }}
    </Form>
  )
}
