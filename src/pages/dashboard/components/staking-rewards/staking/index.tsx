import React from 'react'
import { Trans } from '@lingui/macro'
import * as Yup from 'yup'
import Form from '@components/atoms/form/form'
import { StakingProps } from '../types'
import StakeRangeSlider from './stake-range-slider'
import StakedInput from './staked-input'
import UnstakedInput from './unstaked-input'
import DailyRewards from './daily-rewards'
import MonthlyRewards from './monthly-rewards'
import RewardFee from './reward-fee'
import SubmitButton from './submit-button'

export default function Staking() {

  const initialValues: StakingProps = {
    rewardSymbol: 'PCR',
    stakedBalance: 100,
    unstakedBalance: 1000,
    claimBalance: 0,
    rewardRate: 15,
    stakeRange: 0,
  }

  const validationSchema = Yup.object()

  const handleSubmit = () => {

  }

  return (
    <Form
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <div>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2 className="m-0"><Trans>Staking</Trans></h2>
          <span>{initialValues.rewardRate}% <Trans>APY</Trans></span>
        </div>
        <div className="mb-5">
          <StakeRangeSlider />
        </div>
        <div className="row">
          <div className="col-6">
            <StakedInput />
          </div>
          <div className="col-6">
            <UnstakedInput />
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-6">
            <DailyRewards />
          </div>
          <div className="col-6">
            <MonthlyRewards />
          </div>
        </div>
        <SubmitButton />
        <RewardFee />
      </div>
    </Form>
  )
}
