import React from 'react'
import { Trans } from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import PortalBlockNumber from '@components/organisms/portal-block-number'
import VestingWrapper from '@components/organisms/vesting'

export default function Vesting() {
  return (
    <>
      <div className="container mt-3 mb-8">
        <PageHeader>
          <div className="row align-items-center">
            <div className="col">
              <PageHeader.Subtitle>
                <Trans>Vesting</Trans>
              </PageHeader.Subtitle>
              <PageHeader.Title>
                <Trans>Dashboard</Trans>
              </PageHeader.Title>
            </div>
          </div>
        </PageHeader>
        <VestingWrapper />
      </div>
      <PortalBlockNumber />
    </>
  )
}

