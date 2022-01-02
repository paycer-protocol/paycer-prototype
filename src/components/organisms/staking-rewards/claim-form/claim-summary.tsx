import React from 'react'
import styled from 'styled-components'
import { t, Trans } from '@lingui/macro'
import useStaking from '@hooks/use-staking'
import Button from '@components/atoms/button'
import CurrencyIcon from '@components/atoms/currency-icon'
import { FormattedNumber } from '@components/atoms/number/formatted-number'
import DashNumber from '@components/organisms/dashboard/dash-number'
import { rewardSymbol } from '@config/staking-rewards'


const RewardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 15px;
  height: 242px;
`

const HorizontalLine = styled.div`
  border-bottom: 1px solid #244166;
  width: 100%;
  margin: 1rem 2rem;
`

export default function ClaimSummary() {
  const stakingRewards = 0
  const rewardBalance = 0
  const lastClaimed = 0
  const totalClaimed = 0

  const {
    claim,
    pendingReward,
    lastDepositedAt,
    lastRewardTime
  } = useStaking()

  const handleClaim = async () => {
    try {
      console.log('blub')
      await claim()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <RewardContainer>
        <div className="d-flex flex-column text-center">
          <span className="text-muted">
              <Trans>Claimable rewards</Trans>
          </span>
          <span className="display-4">
              +&nbsp;
            <FormattedNumber
              value={pendingReward}
              minimumFractionDigits={2}
              maximumFractionDigits={4}
            />
            <CurrencyIcon
              symbol={rewardSymbol}
              className="ms-2"
              width={28}
              height={28}
              style={{marginTop: '-4px'}}
            />
          </span>
        </div>

        <HorizontalLine className="d-none d-md-block"/>

        <div className="d-flex align-items-center justify-content-between w-75">
          <div>
            <label className="form-label d-block">{t`Last Deposited at`}</label>
            {lastDepositedAt}
          </div>

          <div>
            <label className="form-label d-block">{t`Last Rewardet at`}</label>
            {lastRewardTime}
          </div>
        </div>
      </RewardContainer>

      <div className="d-flex align-items-center justify-content-center mb-3">
        <Button
          type="submit"
          title={t`Apply`}
          variant={'primary'}
          className="px-5"
          onClick={handleClaim}
        >
          {t`Claim`}
        </Button>
      </div>
    </div>
  )
}
