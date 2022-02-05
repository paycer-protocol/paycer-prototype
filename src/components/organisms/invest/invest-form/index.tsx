import React, { memo } from 'react'
import * as Yup from 'yup'
import Form from '@components/atoms/form/form'
import Card from '@components/molecules/card'
import DashNumber from '@components/organisms/dashboard/dash-number'
import InvestRangeSlider from './fields/invest-range-slider'
import InvestInput from './fields/invest-input'
import InvestCardHeader from './invest-card-header'
import BaseInput from './fields/base-Input'
import SubmitButton from './fields/submit-button'
import InvestFee from './invest-fee'
import { InvestFormFields } from '../types'
import useToken from '@hooks/use-token'
import { t } from '@lingui/macro'
import {useInvestList} from '@context/invest-list-context'

const InvestForm = () => {

    const {
        investFormStrategy
    } = useInvestList()

    const baseToken = useToken(investFormStrategy.input.symbol)
    const investToken = useToken(investFormStrategy.output.symbol)

    const handleSubmit = (values: InvestFormFields) => {
        alert(values.investBalance)
    }

    const initialValues: InvestFormFields = {
        // invest pairs
        baseSymbol: investFormStrategy.input.symbol,
        baseBalance: baseToken.tokenBalance() || 1000,
        investSymbol: investFormStrategy.output.symbol,
        investBalance: investToken.tokenBalance() || 1000,

        // interest
        interestRate: investFormStrategy.interest.interestRate,
        interestSymbol: investFormStrategy.interest.interestSymbol,

        // rewards
        rewardSymbol: investFormStrategy.rewards.rewardSymbol,
        rewardRate: investFormStrategy.rewards.rewardRate,

        // fees
        feeSymbol: investFormStrategy.fees.feeSymbol,
        withdrawFee: investFormStrategy.fees.withdrawFee,
        investFee: investFormStrategy.fees.investFee,

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
              <Card className="shadow-none mb-0">
                  <InvestCardHeader {...investFormStrategy} />
                  <Card.Body>
                      <div className="mb-5">
                          <InvestRangeSlider />
                      </div>
                      <div className="row mb-4">
                          <div className="col-12 col-md-6 mb-4 mb-md-0">
                              <BaseInput />
                          </div>
                          <div className="col-12 col-md-6 mb-4 mb-md-0">
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
                                symbol={values.interestSymbol}
                              />
                          </div>
                      </div>
                      <div className="text-center">
                          <SubmitButton />
                          <InvestFee />
                      </div>
                  </Card.Body>
              </Card>
            )}
        </Form>
    )
}

export default memo(InvestForm)
