import React from 'react'
import styled from 'styled-components'
import PageHeader from '@components/molecules/page-header'
import Card from '@components/molecules/card'
import { Money, Percentage } from '@components/atoms/number'
import Button from '@components/atoms/button'

const StackedIcons = styled.div`
  display: flex;
  align-items: center;
  
  img {
      width: 32px;
      height: 32px;
      margin-right: -12px;
  }
`

const InvestCard = () => (
    <Card border="dark" className="box-shadow">
        <Card.Body>
            <h6 className="text-uppercase text-center text-muted my-4">
                Basic plan
            </h6>
            <div className="row g-0 align-items-center justify-content-center">
                <div className="col-auto">
                    <div className="h2 mb-0">%</div>
                </div>
                <div className="col-auto">
                    <div className="display-2 mb-0">19</div>
                </div>
            </div>
            <div className="h6 text-uppercase text-center text-muted mb-5">
                / APR
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex align-items-center justify-content-between px-0">
                    <small className="text-muted">Assets</small>
                    <StackedIcons>
                        <img src="assets/token/svg/color/usdt.svg" alt="usdt" />
                        <img src="assets/token/svg/color/usdc.svg" alt="usdc" />
                        <img src="assets/token/svg/color/bnb.svg" alt="busd" />
                    </StackedIcons>
                </li>
                <li className="list-group-item d-flex align-items-center justify-content-between px-0">
                    <small className="text-muted">TVL</small>
                    <span className="text-muted"><Money value={48398090.938} /></span>
                </li>
                <li className="list-group-item d-flex align-items-center justify-content-between px-0">
                    <small className="text-muted">Deposited</small>
                    <span className="text-muted"><Money value={1283.59} /></span>
                </li>
                <li className="list-group-item d-flex align-items-center justify-content-between px-0">
                    <small className="text-muted">Earned</small>
                    <span className="text-muted"><Money value={150} currency="PCR" /></span>
                </li>
            </ul>

            <Button variant="light" className="w-100">
                Start with Basic
            </Button>
        </Card.Body>
    </Card>
)

export default function Invest() {

    return (
        <div className="container">
            <PageHeader>
                <div className="row align-items-center">
                    <div className="col">
                        <PageHeader.Subtitle>Overview</PageHeader.Subtitle>
                        <PageHeader.Title>Invest</PageHeader.Title>
                    </div>
                    <div className="col-auto">
                        <Button variant="outline-primary">
                            Create Portfolio
                        </Button>
                    </div>
                </div>
            </PageHeader>
            <div className="row">
                <div className="col-12 col-md-6 col-lg-4">
                    <InvestCard />
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <InvestCard />
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <InvestCard />
                </div>
            </div>
        </div>
    )
}
