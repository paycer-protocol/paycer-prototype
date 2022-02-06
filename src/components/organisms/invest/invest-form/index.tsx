import React, { memo } from 'react'
import * as Yup from 'yup'
import useToken from '@hooks/use-token'
import Form from '@components/atoms/form/form'
import DashNumber from '@components/organisms/dashboard/dash-number'
import InvestRangeSlider from './fields/invest-range-slider'
import InvestCardHeader from './invest-card-header'
import InvestInput from './fields/invest-input'
import SubmitButton from './fields/submit-button'
import InvestFee from './invest-fee'
import { InvestFormFields } from '../types'
import { t } from '@lingui/macro'
import {useInvestList} from '@context/invest-list-context'
import CurrencyIcon from "@components/atoms/currency-icon";

const InvestForm = () => {

    const {
        strategy
    } = useInvestList()

    const handleSubmit = (values: InvestFormFields) => {
        alert(values.investAmount)
    }

    const baseToken = useToken(strategy.input.symbol)

    const initialValues: InvestFormFields = {
        // invest pairs
        baseSymbol: strategy.input.symbol,
        investAmount: null,
        balance: baseToken.tokenBalance(),
        investSymbol: strategy.output.symbol,

        // interest
        interestRate: strategy.interest.interestRate,
        interestSymbol: strategy.interest.interestSymbol,

        // rewards
        rewardSymbol: strategy.rewards.rewardSymbol,
        rewardRate: strategy.rewards.rewardRate,

        // fees
        feeSymbol: strategy.fees.feeSymbol,
        withdrawFee: strategy.fees.withdrawFee,
        investFee: strategy.fees.investFee,

        // form
        investRange: 0
    }

    const validationSchema = Yup.object().shape({
        investAmount: Yup.number().min(0).required()
    })

    return (
        <Form
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            enableReinitialize
        >
            {({ values }) => (
              <div className="shadow-none mb-0">
                  <InvestCardHeader {...strategy} />
                  <div>
                      <div className="card bg-dark shadow-none mb-0 mt-2 input-card">
                          <div className="card-body">
                              <div className="row">
                                  <div className="col-5 d-flex">
                                      <div className="d-flex align-items-center cursor-pointer">
                                          <CurrencyIcon
                                              symbol={strategy.input.symbol}
                                              className="me-3"
                                              width={32}
                                              height={32}
                                          />
                                          <div>
                                              <small style={{paddingBottom: '1px'}} className="text-muted d-block fw-lighter">{t`Balance`}</small>
                                              <div className="d-flex align-items-center">
                                                  <h3 className="mb-0 text-white">{strategy.input.symbol}</h3>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="col-7 d-flex align-items-center">
                                      <InvestInput />
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="mb-5">
                          <InvestRangeSlider />
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
                  </div>
              </div>
            )}
        </Form>
    )
}

export default memo(InvestForm)
