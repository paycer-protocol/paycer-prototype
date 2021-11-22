import React from 'react'
import {t, Trans} from '@lingui/macro'
import * as Styles from '../Styles'
import * as Yup from 'yup'
import Form from '@components/atoms/form/form'
import { TokenSale } from '@config/token-sale'
import Token0Input from './fields/token0-input'
import TokenSelect from './fields/token-select'
import SubmitButton from './fields/submit-button'
import Summary from './summary'
import { InvestFormProps } from './types'
import useToken from "@hooks/use-token";
import ReferralCodeInput from "@components/organisms/token-sale/invest-form/fields/referral-code-input";

const initialToken = TokenSale[0]

export default function InvestForm() {

  const queryParams = new URLSearchParams(window.location.search)
  const referralCode = queryParams.get('referralCode')

  const initialValues: InvestFormProps = {
    token0: initialToken,
    token0Value: 0,
    token0Balance: useToken(initialToken.symbol).tokenBalance(),
    referralCode: referralCode || '',
    referralCodeValid: false,
    willReceive: 0,
    referralBonus: 0
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
                <Styles.LeftCol>
                  <div className="d-flex flex-column flex-md-row">
                    <div className="w-100">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="w-75">
                            <div className="text-muted text-uppercase h5">
                              {t`Select a token`}
                            </div>
                            <div className="pt-1">
                              <TokenSelect />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="text-muted text-uppercase h5">
                            {t`Invest amount`}
                          </div>
                          <Token0Input />
                        </div>
                      </div>

                      <div className="horizontal-line mt-5" />

                      <div className="text-muted text-uppercase h5">
                        {t`Referral Bonus Code`} ¹
                      </div>

                      <ReferralCodeInput />

                    </div>
                  </div>

                  {errors.token0Value ? (
                      <div className="mb-3 mt-3 alert-danger px-3 py-3">{errors.token0Value}</div>
                  ) : null}

                  <div className="horizontal-line mt-5" />

                  <div className="d-flex flex-column flex-md-row mb-5 mt-5 justify-content-center">
                    <SubmitButton />
                  </div>
                </Styles.LeftCol>
                <div className="vertical-line" />
                <div className="horizontal-line d-md-none" />
                <Styles.RightCol>
                  <Summary />
                </Styles.RightCol>
              </div>
          )
        }}
      </Form>
  )
}
