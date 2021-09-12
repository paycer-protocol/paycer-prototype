import React from 'react'
import { t, Trans } from '@lingui/macro'
import { tokenProvider }  from '../../../../providers/tokens'
import * as Styles from './Styles'
import * as Yup from 'yup'
import Form from '@components/atoms/form/form'
import SubmitButton from './fields/submit-button'
import { SwapProps } from '../types'
import CurrencyInput from "./fields/currency-input";



export default function SwapForm() {

  const initialValues: SwapProps = {
    fromCurrency: tokenProvider['DAI'].symbol,
    fromValue: 0,
    toCurrency: tokenProvider['USDT'].symbol,
    toValue: 0,
  }

  const validationSchema = Yup.object().shape({
    toValue: Yup.number().min(0).required(),
    fromValue: Yup.number().min(0).required(),
  })

  const handleSubmit = (values: SwapProps) => {

  }

  return (
    <Form
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values }) => {
        return (
          <div className="w-50">
            <Styles.CurrencyInputLabel>
              {t`Swap`}
            </Styles.CurrencyInputLabel>

            <Styles.HorizontalLine className="d-block" />

            <div className="d-flex flex-column flex-md-row">
              <div className="w-100">
                <CurrencyInput
                  selectName="fromCurrency"
                  inputName="fromValue"
                  label={t`Swap from`}
                />
                <Styles.HorizontalLine className="d-block" />
                <CurrencyInput
                    selectName="toCurrency"
                    inputName="toValue"
                    label={t`Swap to`}
                />
                <Styles.HorizontalLine className="d-block" />
                <SubmitButton />

              </div>
            </div>

            <Styles.VerticalLine className="d-none d-md-block" />
            <Styles.HorizontalLine className="d-block d-md-none" />

          </div>
        )
      }}
    </Form>
  )
}
