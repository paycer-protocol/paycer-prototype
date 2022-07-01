import React from 'react'
import PageHeader from '@components/molecules/page-header'
import { t } from '@lingui/macro'
import { connectors } from '@providers/connectors'
import Button from '@components/atoms/button'
import { useDapp } from '@context/dapp-context'
import Layout from '@components/organisms/layout'
import ReferralUrl from './components/ReferralUrl'
import Referrals from './components/Referrals'

export default function Referral() {
  const { isAuthenticated, handleWalletConnect } = useDapp()

  return (
    <Layout>
      <div className="container mt-3">
        <PageHeader>
          <div className="row align-items-center">
            <div className="col">
              <PageHeader.Subtitle>Referral Program</PageHeader.Subtitle>
              <PageHeader.Title>Refer Friends. Earn Crypto Together.</PageHeader.Title>
            </div>
          </div>
        </PageHeader>
        <div className="card blur-background">
          <div className="card-body">
            {isAuthenticated && (
              <>
                <ReferralUrl />
                <Referrals />
              </>
            )}

            {!isAuthenticated && (
            <div className="d-flex justify-content-center">
              <Button variant="primary" className="px-5" onClick={() => handleWalletConnect(connectors[0])}>
                {/* @ts-ignore */}
                {t`Connect to a Wallet`}
              </Button>
            </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
