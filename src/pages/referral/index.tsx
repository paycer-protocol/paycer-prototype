import React from 'react'
import PageHeader from '@components/molecules/page-header'
import ReferralUrl from './components/ReferralUrl'
import Referrals from './components/Referrals'

export default function Referral () {

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
          <ReferralUrl />
          <Referrals />
        </div>
      </div>
    </div>
  )
}
