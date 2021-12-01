import React from 'react'
import PageHeader from '@components/molecules/page-header'
import ReferralUrl from './components/ReferralUrl'
import Referrals from './components/Referrals'
import useWallet from '@hooks/use-wallet'
import Button from '@components/atoms/button'
import {connectors} from '@providers/connectors'
import {Trans} from '@lingui/macro'

export default function Referral () {
  const wallet = useWallet()

  return (
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
          {wallet.isConnected && (
            <>
              <ReferralUrl />
              <Referrals />
            </>
          )}

          {!wallet.isConnected && (
            <div className="d-flex justify-content-center">
              <Button variant="primary" className="px-5" onClick={() => wallet.connect(connectors[0])}>
                <Trans>Connect to a Wallet</Trans>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
