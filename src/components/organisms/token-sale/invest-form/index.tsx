import React from 'react'
import {t, Trans} from '@lingui/macro'
import * as Styles from '../Styles'
import * as Yup from 'yup'
import Form from '@components/atoms/form/form'
import { TokenSale } from '@config/token-sale'
import Token0Input from './fields/token0-input'
import TokenRangeSlider from './fields/token-range-slider'
import TokenSelect from './fields/token-select'
import SubmitButton from './fields/submit-button'
import Summary from './summary'
import { InvestFormProps } from './types'
import useToken from "@hooks/use-token";
import {LeftCol, RightCol} from "../../../../pages/token-sale";

const initialToken = TokenSale[0]

export default function InvestForm() {

  const initialValues: InvestFormProps = {
    token0: initialToken,
    token0Value: 0,
    token0Balance: useToken(initialToken.symbol).tokenBalance(),
    referralCode: 'blubb',
    willReceive: 0
  }

  const validationSchema = Yup.object().shape({
    token0Value: Yup.number().min(0).required(),
  })

  const handleSubmit = (values: InvestFormProps) => {
    console.log(values)
  }

  return (
      <Form
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
      >
        {({ errors }) => {
          return (
              <div className="d-lg-flex">
                <LeftCol>
                  <div className="d-flex flex-column flex-md-row">
                    <div className="w-100">
                      <Styles.CurrencyInputLabel>
                        {t`Select a token`}
                      </Styles.CurrencyInputLabel>

                      <div className="d-flex flex-column flex-md-row mb-5">
                        <div className="w-100 me-4">
                          <TokenSelect />
                        </div>
                      </div>

                      <Styles.CurrencyInputLabel>
                        {t`Enter the amount you would like to invest`}
                      </Styles.CurrencyInputLabel>

                      <div className="d-flex flex-column flex-md-row mb-5 pt-2 mt-4 pb-3">
                        <TokenRangeSlider />
                      </div>

                      <div className="row">
                        <div className="col-lg-6">
                          <Token0Input />
                        </div>
                      </div>
                    </div>
                  </div>

                  {errors.token0Value ? (
                      <div className="mb-3 mt-3 alert-danger px-3 py-3">{errors.token0Value}</div>
                  ) : null}

                  <div className="d-flex flex-column flex-md-row mb-5 mt-5 justify-content-center">
                    <SubmitButton />
                  </div>
                </LeftCol>
                <div className="vertical-line" />
                <div className="horizontal-line d-md-none" />
                <RightCol>
                  <Summary />
                </RightCol>
              </div>
          )
        }}
      </Form>
  )
}
