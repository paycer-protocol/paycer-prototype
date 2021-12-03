import React from 'react'
import styled from 'styled-components'
import { t, Trans } from '@lingui/macro'
import Button from '@components/atoms/button'
import CurrencyIcon from '@components/atoms/currency-icon'
import { FormattedNumber } from '@components/atoms/number/formatted-number'
import DashNumber from '@components/organisms/dashboard/dash-number'
import useStakingRewards from '@hooks/use-staking-rewards'
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
  const stakingRewards = useStakingRewards()
  const rewardBalance = stakingRewards.rewardBalance()
  const lastClaimed = stakingRewards.lastClaimed()
  const totalClaimed = stakingRewards.totalClaimed()

  const handleClaim = () => {
    try {
      stakingRewards.claim()
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
              value={rewardBalance}
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
          <DashNumber
            label={t`Last claimed`}
            value={lastClaimed}
            symbol={rewardSymbol}
          />
          <DashNumber
            label={t`Total claimed`}
            value={totalClaimed}
            symbol={rewardSymbol}
          />
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
