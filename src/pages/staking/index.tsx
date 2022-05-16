import React from 'react'
import PageHeader from '@components/molecules/page-header'
import PortalBlockNumber from '@components/organisms/portal-block-number'
import StakingForm from '@components/organisms/staking-rewards/staking-form'
import ClaimForm from '@components/organisms/staking-rewards/claim-form'
import { useWallet } from '@context/wallet-context'

export default function Staking () {
  const { currentChainIsSupportedForStaking } = useWallet()

  if (!currentChainIsSupportedForStaking) {
    location.href = '/portfolio'

    return
  }

  return (
    <>
      <div className="container mt-3">
        <PageHeader>
          <div className="row align-items-center">
            <div className="col">
              <PageHeader.Subtitle>Staking</PageHeader.Subtitle>
              <PageHeader.Title>Earn rewards</PageHeader.Title>
            </div>
          </div>
        </PageHeader>

        <div className="row">
          <div className="col-md-6 mb-4 mb-md-0">
            <div className="card blur-background mb-0 shadow-none">
              <div className="card-body p-4 p-md-5">
                <StakingForm />
              </div>
            </div>
          </div>
          <div className="col-md-6 blur-background">
            <div className="card bg-dark border-purple-dark w-100 mb-0 shadow-none h-100">
              <div className="card-body p-5 align-items-center d-flex flex-column w-100 justify-content-center animated-wrapper">
                <ClaimForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      <PortalBlockNumber />
    </>
  )
}
