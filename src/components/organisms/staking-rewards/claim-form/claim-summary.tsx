import React from 'react'
import styled from 'styled-components'
import { t, Trans } from '@lingui/macro'
import Button from '@components/atoms/button'
import { FormattedNumber } from '@components/atoms/number/formatted-number'
import DashNumber from '@components/organisms/dashboard/dash-number'
import {useContractCall, useEthers} from '@usedapp/core'
import { Interface } from '@ethersproject/abi'
import stakingAbi from '@contracts/abi/StakingRewards.json'

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
  const { account } = useEthers()

  const claimBalance = useContractCall({
    abi: new Interface(stakingAbi.abi),
    address: stakingAbi.address,
    method: 'rewardBalanceOf',
    args: [account],
  })

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
              value={Number(claimBalance || 0)}
              minimumFractionDigits={2}
              maximumFractionDigits={4}
            />
            &nbsp;{'PCR'}
            </span>
        </div>

        <HorizontalLine className="d-none d-md-block"/>

        <div className="d-flex align-items-center justify-content-between w-75">
          <DashNumber
            label={t`Last claimed`}
            value={365}
            symbol={'PCR'}
          />
          <DashNumber
            label={t`Total claimed`}
            value={365}
            symbol={'PCR'}
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
