import React from 'react'
import {t, Trans} from '@lingui/macro'
import * as Yup from 'yup'
import Form from '@components/atoms/form/form'
import DashNumber from '@components/organisms/dashboard/dash-number'
import StakeRangeSlider from './fields/stake-range-slider'
import StakedInput from './fields/staked-input'
import TokenInput from './fields/token-input'
import SubmitButton from './fields/submit-button'
import RewardFee from './reward-fee'
import StakingSummary from './staking-summary'
import { StakingProps } from '../types'

export default function StakingForm() {

  const initialValues: StakingProps = {
    rewardSymbol: 'PCR',
    stakedBalance: 100,
    tokenBalance: 1000,
    claimBalance: 0,
    rewardRate: 15,
    stakeRange: 0,
    depositFee: 0.01,
    withdrawFee: 0.01,
    disabled: true,
  }

  const validationSchema = Yup.object().shape({
    stakedBalance: Yup.number().min(0).required(),
    tokenBalance: Yup.number().min(0).required(),
  })

  const handleSubmit = () => {}

  return (
    <Form
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => {
        if (values.disabled) {
          return <StakingSummary />
        }

        return (
          <div>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h2 className="m-0"><Trans>Staking</Trans></h2>
              <span>{initialValues.rewardRate}% <Trans>APY</Trans></span>
            </div>
            <div className="mb-5">
              <StakeRangeSlider />
            </div>
            <div className="row mb-4">
              <div className="col-6">
                <TokenInput />
              </div>
              <div className="col-6">
                <StakedInput />
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-6">
                <DashNumber
                  label={t`Daily rewards`}
                  value={values.stakedBalance * values.rewardRate / 100 / 365}
                  symbol={values.rewardSymbol}
                />
              </div>
              <div className="col-6">
                <DashNumber
                  label={t`Monthly rewards`}
                  value={values.stakedBalance * values.rewardRate / 100 / 30}
                  symbol={values.rewardSymbol}
                />
              </div>
            </div>
            <SubmitButton />
            <RewardFee />
          </div>
        )
      }}
    </Form>
  )
}
