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
import { InvestmentStrategy } from '@types/investment'

const VerticalLine = styled.div`
    border-right: 1px solid #244166;
    margin: 20px 30px 20px 50px;
`

export default () => {
  const handleSubmit = (values: InvestmentStrategy) => {
  }

  const initialValues: InvestmentStrategy = {
    ...investmentStrategies[0],
    ...{
      investAmount: 0,
      baseBalance: 1000,
    }
  }

  const validationSchema = Yup.object().shape({
    investAmount: Yup.number().min(0).required(),
    walletBalance: Yup.number().min(0).required(),
    riskLevel: Yup.number().min(0).required(),
  })

  return (
    <div className="container mt-3">
      <PageHeader>
        <div className="row align-items-center">
          <div className="col">
            <PageHeader.Subtitle>Earn interest</PageHeader.Subtitle>
            <PageHeader.Title>Create investment</PageHeader.Title>
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
                  <SubmitButton />
              </div>
              <VerticalLine />
              <div className="w-100">
                <h2 className="mb-5">
                  <Trans>Distribution</Trans>
                </h2>
                <InvestmentAssets />
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  )
}
