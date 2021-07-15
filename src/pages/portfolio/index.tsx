import React from 'react'
import PageHeader from '@components/molecules/page-header'
import DashCards from './components/dash-cards'
import Portfolio from './components/portfolio'
import Button from '@components/atoms/button'

export default function Home() {
  return (
    <div className="container">
      <PageHeader>
        <div className="row align-items-center">
          <div className="col">
            <PageHeader.Subtitle>Overview</PageHeader.Subtitle>
            <PageHeader.Title>Portfolio</PageHeader.Title>
          </div>
          <div className="col-auto">
            <Button variant="outline-primary">
              Create Plan
            </Button>
          </div>
        </div>
      </PageHeader>
      <div className="container">
        <DashCards />
        <div className="row">
          <div className="col-12">
            <Portfolio />
          </div>
        </div>
      </div>
    </div>
  )
}

