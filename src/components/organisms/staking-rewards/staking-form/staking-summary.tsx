import React from 'react'
import styled from 'styled-components'
import { useFormikContext } from 'formik'
import { t, Trans } from '@lingui/macro'
import Button from '@components/atoms/button'
import ProgressBar from '@components/atoms/progress-bars'
import DashNumber from '@components/organisms/dashboard/dash-number'
import { StakingProps } from '../types'

const StyledProgressBar = styled(ProgressBar)`
    margin-top: 28px;
    margin-bottom: 42px;
`

const StakeContainer = styled.div`
  margin-bottom: 15px;
`

export default function StakingSummary() {
  const { initialValues, setFieldValue } = useFormikContext<StakingProps>()
  const totalBalance = initialValues.stakedBalance.add(initialValues.tokenBalance)
  const currentStakeRatio = initialValues.stakeRange * 100 / totalBalance.toNumber()

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="m-0"><Trans>Staking</Trans></h2>
        <span>{initialValues.rewardRate.toNumber()}% <Trans>APY</Trans></span>
      </div>
      <div className="mb-5">
        <StyledProgressBar
          className="progress-sm"
          min={0}
          max={100}
          now={currentStakeRatio}
        />
      </div>
      <div className="row">
        <div className="col-6">
          <StakeContainer className="mb-5">
            <DashNumber
              label={t`Token Balance`}
              value={initialValues.tokenBalance.toNumber()}
              symbol={initialValues.rewardSymbol}
            />
          </StakeContainer>
        </div>
        <div className="col-6">
          <StakeContainer className="mb-5">
            <DashNumber
              label={t`Current Staked`}
              value={initialValues.stakedBalance.toNumber()}
              symbol={initialValues.rewardSymbol}
            />
          </StakeContainer>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-6">
          <DashNumber
            label={t`Daily rewards`}
            value={initialValues.stakedBalance.mul(initialValues.rewardRate).div(100).div(365).toNumber()}
            symbol={initialValues.rewardSymbol}
          />
        </div>
        <div className="col-6">
          <DashNumber
            label={t`Monthly rewards`}
            value={initialValues.stakedBalance.mul(initialValues.rewardRate).div(100).div(30).toNumber()}
            symbol={initialValues.rewardSymbol}
          />
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-center mb-3">
        <Button
          title={t`Apply`}
          variant={'outline-primary'}
          className="px-5"
          onClick={() => setFieldValue('disabled', false)}
        >
          {t`Stake`}
        </Button>
      </div>
    </div>
  )
}
