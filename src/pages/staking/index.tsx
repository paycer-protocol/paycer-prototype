import React from 'react'
import PageHeader from '@components/molecules/page-header'
import PortalBlockNumber from '@components/organisms/portal-block-number'
import StakingForm from '@components/organisms/staking-rewards/staking-form'
import ClaimForm from '@components/organisms/staking-rewards/claim-form'
import StakingContextProvider from '@context/staking-context'
import Layout from '@components/organisms/layout'
import { useDapp } from '@context/dapp-context'
import { t } from '@lingui/macro'

export default function Staking() {
  const { currentChainIsSupportedForStaking, isAuthenticated, walletAddress } = useDapp()

  if (!currentChainIsSupportedForStaking) {
    return (
      <Layout>
        <div className="d-flex flex-column align-items-center justify-content-center mt-8">
          {/* @ts-ignore */}
          <h1>{t`Network not supported`}</h1>
          {/* @ts-ignore */}
          {t`Change network`}
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mt-3">
        <PageHeader>
          <div className="row align-items-center">
            <div className="col">
              <PageHeader.Subtitle>Staking</PageHeader.Subtitle>
              <PageHeader.Title>Earn rewards</PageHeader.Title>
            </div>
          </div>
        </PageHeader>
        <StakingContextProvider>
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
        </StakingContextProvider>
      </div>
      <PortalBlockNumber />
    </Layout>
  )
}
