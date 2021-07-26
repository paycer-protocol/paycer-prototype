import React from 'react'
import * as Yup from 'yup'
import styled, { css } from 'styled-components'
import Form from '@components/atoms/form/form'
import Card from '@components/molecules/card'
import DashNumber from '@components/organisms/dashboard/dash-number'
import InvestRangeSlider from './fields/invest-range-slider'
import InvestInput from './fields/invest-input'
import InvestCardHeader from './invest-card-header'
import BaseInput from './fields/base-Input'
import SubmitButton from './fields/submit-button'
import InvestFee from './invest-fee'
import Button from '@components/atoms/button'
import { InvestFormFields } from '../types'
import { InvestmentStrategy } from '../../../../types/investment'
import { t } from "@lingui/macro";

const StyledCard = styled(Card)`
   ${props => !props.isModal && css`
      border-top-left-radius: 0;
      border-top-right-radius: 0;
   `}  
`

const InvestForm = (props: InvestmentStrategy) => {
    const {
        // invest pairs
        baseSymbol,
        baseBalance,
        investSymbol,
        investBalance,

        // interest
        interestRate,
        earnedInterest,

        // rewards
        rewardSymbol,
        rewardRate,
        earnedReward,

        // fees
        feeSymbol,
        withdrawFee,
        investFee,
        setShowInvestForm,
        isModal
    } = props

    const handleSubmit = (values: InvestFormFields) => {
        alert(values.investBalance)
    }

    const initialValues: InvestFormFields = {
        // invest pairs
        baseSymbol,
        baseBalance: 10000,
        investSymbol,
        investBalance: 1000,

        // interest
        interestRate,
        earnedInterest,

        // rewards
        rewardSymbol,
        rewardRate,
        earnedReward,

        // fees
        feeSymbol,
        withdrawFee,
        investFee,

        // form
        investRange: 0,
        submitAction: 'invest'
    }

    const validationSchema = Yup.object().shape({
        baseBalance: Yup.number().min(0).required(),
        investBalance: Yup.number().min(0).required(),
    })

    return (
        <Form
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            enableReinitialize
        >
            {({ values }) => (
              <StyledCard className="shadow-none mb-0">
                  <InvestCardHeader {...props} />
                  <Card.Body>
                      <div className="mb-5">
                          <InvestRangeSlider />
                      </div>
                      <div className="row mb-4">
                          <div className="col-6">
                              <BaseInput />
                          </div>
                          <div className="col-6">
                              <InvestInput />
                          </div>
                      </div>
                      <div className="row mb-5">
                          <div className="col-6">
                              <DashNumber
                                  label={t`Daily rewards`}
                                  value={values.investBalance * values.rewardRate / 100 / 365}
                                  symbol={values.rewardSymbol}
                              />
                          </div>
                          <div className="col-6">
                              <DashNumber
                                label={t`Daily interest`}
                                value={values.investBalance * values.interestRate / 100 / 365}
                                symbol={values.rewardSymbol}
                              />
                          </div>
                      </div>

                      <div className="row justify-content-end">
                          <div className="col-md-6">
                              <Button variant="outline-primary" className="w-100" onClick={() => setShowInvestForm(false)}>{t`Cancel`}</Button>
                          </div>
                          <div className="col-md-6">
                              <SubmitButton />
                              <InvestFee />
                          </div>
                      </div>

                  </Card.Body>
              </StyledCard>
            )}
        </Form>
    )
}

export default InvestForm
