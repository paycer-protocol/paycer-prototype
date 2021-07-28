import React from 'react'
import Link from 'next/link'
import { Trans } from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import DashCards from './components/dash-cards'
import Portfolio from './components/portfolio'
import Button from '@components/atoms/button'

export default function Home() {
  return (
    <div className="container mt-3">
      <PageHeader>
        <div className="row align-items-center">
          <div className="col">
            <PageHeader.Subtitle>
                <Trans>Overview</Trans>
            </PageHeader.Subtitle>
            <PageHeader.Title>
                <Trans>Portfolio</Trans>
            </PageHeader.Title>
          </div>
          <div className="col-auto">
            <Link href="/invest/create">
              <Button variant="outline-primary">
                  <Trans>Create investment</Trans>
              </Button>
            </Link>
          </div>
        </div>
      </PageHeader>
      <div className="blur-background">
          <DashCards />
          <div className="row position-relatives">
            <div className="col-12">
              <Portfolio />
            </div>
          </div>
      </div>
    </div>
  )
}

