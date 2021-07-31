import React from 'react'
import * as Yup from 'yup'
import { Trans } from '@lingui/macro'
import styled from 'styled-components'
import Form from '@components/atoms/form/form'
import PageHeader from '@components/molecules/page-header'
import InvestRangeSlider from './fields/invest-range-slider'
import InvestInput from './fields/invest-input'
import RiskChoice from './fields/risk-choice'
import InvestmentAssets from './fields/investment-assets'
import SubmitButton from './fields/submit-button'
import { investmentStrategies } from '@config/investment/strategies'
import { InvestFormFields } from '@components/organisms/invest/types'
import useToken from "@hooks/use-token";

const VerticalLine = styled.div`
    border-right: 1px solid #244166;
    margin: 20px 30px 20px 50px;
`

export default () => {
  const initialStrategy = investmentStrategies[0]
  const baseToken = useToken(initialStrategy.input.symbol)
  const investToken = useToken(initialStrategy.output.symbol)

  const handleSubmit = (values: InvestFormFields) => {
  }

  const initialValues: InvestFormFields = {
    // invest pairs
    baseSymbol: baseToken.symbol,
    baseBalance: baseToken.tokenBalance(),
    investSymbol: investToken.symbol,
    investBalance: investToken.tokenBalance(),

    // interest
    interestRate: initialStrategy.interest.interestRate,
    interestSymbol: initialStrategy.interest.interestSymbol,

    // rewards
    rewardSymbol: initialStrategy.rewards.rewardSymbol,
    rewardRate: initialStrategy.rewards.rewardRate,

    // fees
    feeSymbol: initialStrategy.fees.feeSymbol,
    withdrawFee: initialStrategy.fees.withdrawFee,
    investFee: initialStrategy.fees.investFee,

    assets: initialStrategy.assets,

    // form
    investRange: 0,
    submitAction: 'invest'
  }

  const validationSchema = Yup.object().shape({
    investAmount: Yup.number().min(0).required(),
    baseBalance: Yup.number().min(0).required(),
  })

  return (
    <div className="container mt-3">
      <PageHeader>
        <div className="row align-items-center">
          <div className="col">
            <PageHeader.Subtitle>
              <Trans>Earn interest</Trans>
            </PageHeader.Subtitle>
            <PageHeader.Title>
              <Trans>Create investment</Trans>
            </PageHeader.Title>
          </div>
        </div>
      </PageHeader>
      <Form
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-column flex-md-row">
              <div className="w-100">
                <h2 className="mb-5">
                  <Trans>Invest amount</Trans>
                </h2>
                  <InvestInput />
                  <InvestRangeSlider />
                  <RiskChoice />
                <div className="d-none d-md-flex align-items-center justify-content-center mb-3">
                  <SubmitButton />
                </div>
              </div>
              <VerticalLine />
              <div className="w-100">
                <h2 className="mb-5">
                  <Trans>Distribution</Trans>
                </h2>
                <InvestmentAssets />
                <div className="d-flex d-md-none align-items-center justify-content-center mb-5">
                  <SubmitButton className="w-100"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  )
}
