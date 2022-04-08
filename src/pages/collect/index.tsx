import React from 'react'
import { t } from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import Overview from '@components/organisms/collect/overview'

export default function Collect() {

  return (
    <>
      <div className="container mt-3">
        <PageHeader>
          <div className="row align-items-center">
            <div className="col">
              <PageHeader.Subtitle>
                {t`Collect`}
              </PageHeader.Subtitle>
              <PageHeader.Title>
                {t`Paycer Utility NFT`}
              </PageHeader.Title>
            </div>
          </div>
        </PageHeader>

        <Overview />

      </div>
    </>
  )
}

