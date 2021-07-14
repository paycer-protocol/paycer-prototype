import React from 'react'
import { Trans } from '@lingui/macro'
import StakingForm from '@components/organisms/staking-rewards/staking-form'

export default function StakingCard() {
  return (
    <div className="card">
      <div className="card-header">
        <div className="row align-items-center">
          <div className="col">
            <h4 className="card-header-title">
              <Trans>Rewards</Trans>
            </h4>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-12 col-md-6 mb-5">
            <StakingForm />
          </div>
          <div className="col-12 col-md-6">
            <StakingForm />
          </div>
        </div>
      </div>
    </div>
  )
}
