import React, {useState} from 'react'
import styled from 'styled-components'
import { t, Trans } from '@lingui/macro'
import useStaking from '@hooks/use-staking'
import Button from '@components/atoms/button'
import CurrencyIcon from '@components/atoms/currency-icon'
import { FormattedNumber } from '@components/atoms/number/formatted-number'
import DashNumber from '@components/organisms/dashboard/dash-number'
import { rewardSymbol } from '@config/staking-rewards'
import GradientButton from "@components/atoms/button/gradient-button";
import TransactionStatus from "@components/organisms/transaction-status";
import Spinner from "@components/atoms/spinner";


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
  const {
    claim,
    claimTx,
    pendingReward,
    lastDepositedAt,
    lastRewardTime
  } = useStaking()

  const handleClaim = async () => {
    try {
      await claim()
    } catch (e) {
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
        <GradientButton
            type="submit"
            title={t`Claim`}
            className="px-5"
            onClick={handleClaim}
            disabled={pendingReward === 0}
            style={{width: '150px'}}
        >
          {t`Claim`}

        </GradientButton>
      </div>
      <TransactionStatus
          error={claimTx.status === 'Fail' || claimTx.status === 'Exception'}
          success={claimTx.status === 'Success'}
          loading={claimTx.status === 'Mining'}
      />

      <div style={{position: 'absolute', left: '50%', top: '30%'}}>
        <Spinner animation="border" show={claimTx.status === 'Mining'} />
      </div>
    </div>
  )
}
