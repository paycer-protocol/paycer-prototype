import { Trans, t } from '@lingui/macro'
import DashCard from '@components/organisms/dashboard/dash-card'
import { Money } from '@components/atoms/number'
import React from "react";
import styled from 'styled-components'
import { StrategyType } from '../../../types/investment'
import { PieChart } from 'react-minimal-pie-chart'

const DashContainer = styled.div`
  height: 260px;
`

const ChartWrapper = styled.div`
  position: absolute;
  border-radius: 50%;
  width: 300px;
  top: -35%;

  @media (max-width: 767.98px) {
      width: 350px;
        top: -140%;
  }
`

interface PortfolioStrategy extends StrategyType {
    balance?: number
    tvl?: number
    color?: string
}

interface DashCardsProps {
  totalBalance: number,
  strategies: PortfolioStrategy[]
}

export default function DashCards ({ totalBalance, strategies }: DashCardsProps) {

    const renderPieChart = () => {
        if (!strategies.length) {
            return ''
        }

        const pieChartData = []

        strategies.map((strategy, key) => {
            pieChartData.push(
                {
                    value: Number(new Intl.NumberFormat('en-US', { maximumSignificantDigits: 2, style: 'percent'}).format((strategy.balance * 100 / totalBalance) / 100).replace('%', "").replace(/\s/g, "")),
                    color: strategy.color
                },
            )
        })

        return (
            <ChartWrapper>
                <PieChart
                    data={pieChartData}
                    lineWidth={4}
                />
            </ChartWrapper>
        )
    }

     return (
        <DashContainer className="row justify-content-between">
            <div className="col-12 col-md-4 col-lg-3 justify-content-center d-flex ms-auto">
                <DashCard title={t`Balance`} className="mb-0">
                    <div className="d-flex justify-content-between">
                        <img
                          width="30"
                          className="d-none d-md-block me-3"
                          src={`assets/icons/usd.svg`}
                          alt={'USD'}
                        />
                        <div className="fw-normal">
                            <Money value={totalBalance} />
                        </div>
                    </div>
                </DashCard>
            </div>
            <div className="col-12 col-md-4 col-lg-3 justify-content-center d-flex position-relative">
                {renderPieChart()}
                <DashCard title={t`Savings`} className="mb-0">
                    <div className="d-flex justify-content-between fw-normal">
                        <Money value={totalBalance * 13.3 / 100} currency="USD" />
                    </div>
                </DashCard>
            </div>
            <div className="col-12 col-md-4 col-lg-3 justify-content-center d-flex me-auto">
                <DashCard title={t`Risk`} className="mb-0">
                    <div className="d-flex justify-content-between fw-normal">
                        <Trans>Low</Trans>
                    </div>
                </DashCard>
            </div>
        </DashContainer>
    )
}
