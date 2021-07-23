import React from 'react'
import styled from 'styled-components'
import { t, Trans } from '@lingui/macro'
import Button from '@components/atoms/button'
import { FormattedNumber } from '@components/atoms/number/formatted-number'
import DashNumber from '@components/organisms/dashboard/dash-number'
import useStakingRewards from '@components/organisms/web3/hooks/useStakingRewards'
import { rewardSymbol } from '@config/staking-rewards'
import {normalizeFilename} from "../../../../helper/filename";

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
            <img width="28" style={{marginTop: '-4px'}} className="ms-2" src={`assets/icons/${normalizeFilename(rewardSymbol)}.svg`} alt={rewardSymbol} />
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
          title={t`Apply`}
          variant={'outline-primary'}
          className="px-5"
        >
          {t`Claim`}
        </Button>
      </div>
    </div>
  )
}
