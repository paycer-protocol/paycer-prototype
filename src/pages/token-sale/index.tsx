import React from 'react'
import { Trans } from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'


export default function Home() {
  return (
    <div className="container mt-3 mb-8">
      <PageHeader>
        <div className="row align-items-center">
          <div className="col">
            <PageHeader.Subtitle>
              <Trans>Overview</Trans>
            </PageHeader.Subtitle>
            <PageHeader.Title>
              <Trans>Token Sale</Trans>
            </PageHeader.Title>
          </div>
        </div>
      </PageHeader>
      <div>
      </div>
    </div>
  )
}

