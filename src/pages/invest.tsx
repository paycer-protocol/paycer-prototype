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
      width: 35px;
      height: 35px;
      margin-right: -12px;
  }
`

const InvestCard = () => (
    <Card border="dark" className="box-shadow">
        <Card.Body>
            <h4 className="text-uppercase text-center my-4">
                Basic plan
            </h4>

            <div className="d-flex align-items-center justify-content-center">
                <div className="h5 text-muted m-0">%</div>
                <div className="display-1">19</div>
            </div>
            <div className="h6 text-uppercase text-center text-muted mb-5">
                / APR
            </div>

            <div className="d-flex flex-column mb-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <strong>Assets</strong>
                    <StackedIcons>
                        <img src="assets/token/svg/color/usdt.svg" alt="usdt" />
                        <img src="assets/token/svg/color/usdc.svg" alt="usdc" />
                        <img src="assets/token/svg/color/bnb.svg" alt="busd" />
                    </StackedIcons>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <strong>TVL</strong>
                    <span><Money value={48398090.938} /></span>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <strong>Deposited</strong>
                    <span className="d-flex align-items-center">
                        <span className="mr-1">
                            <Money value={1283.59} />
                        </span>
                        <span className="text-muted">
                            (<Percentage value={0.3} />)
                        </span>
                    </span>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <strong>Earned</strong>
                    <span><Money value={150} currency="PCR" /></span>
                </div>
            </div>
            <div className="d-grid">
                <Button variant="dark" block>
                    Invest
                </Button>
            </div>

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
