import React from 'react'
import styled from 'styled-components'
import { PieChart } from 'react-minimal-pie-chart'
import { t } from '@lingui/macro'
import DashCard from '@components/organisms/dashboard/dash-card'
import { Money } from '@components/atoms/number'
import { StrategyType } from '../../../types/investment'
import { riskLabels } from '../../../locales'
import { useDapp } from '@context/dapp-context'

const DashContainer = styled.div`
  height: 260px;
`
const ChartWrapper = styled.div`
  position: absolute;
  border-radius: 50%;
  width: 300px;
  top: -38%;

  @media (max-width: 767.98px) {
      width: 95%;
      top: -90%;
  }
`

interface PortfolioStrategy extends StrategyType {
  balance?: number
  color: string
}

interface DashCardsProps {
  totalInvest: number,
  strategies: PortfolioStrategy[]
}

export default function PortfolioHeader ({ totalInvest, strategies }: DashCardsProps) {

    const { isAuthenticated } = useDapp()

    const renderPieChart = () => {
        if (!strategies.length || !isAuthenticated) {
           return (
               <ChartWrapper>
                    <PieChart data={[{value: 100, color: '#999999'}]} lineWidth={2} paddingAngle={2} />
               </ChartWrapper>
           )
        }

        const pieChartData = []
        strategies.map((strategy) => {
            pieChartData.push({
              value: (strategy.balance * 100 / totalInvest) / 100,
              color: strategy.color
            })
        })

        return (
            <ChartWrapper>
                <PieChart data={pieChartData} lineWidth={2} paddingAngle={2} />
            </ChartWrapper>
        )
    }

    let portfolioRiskLevel = 0
    strategies.map((strategy, key) => {
      portfolioRiskLevel += strategy.riskLevel
    })

    portfolioRiskLevel = Math.round(portfolioRiskLevel / strategies.length)

     return (
        <DashContainer className="row justify-content-between">
            <div className="col-12 col-md-4 col-lg-3 justify-content-center d-flex ms-auto">
                <DashCard title="" className="mb-0">
                </DashCard>
            </div>
            <div className="col-12 col-md-4 col-lg-3 justify-content-center d-flex position-relative">
                {renderPieChart()}
                <DashCard title={t`Total Investment`} className="mb-0">
                    <div className="d-flex justify-content-center w-100">
                        <div className="fw-normal">
                            <Money value={totalInvest} />
                        </div>
                    </div>
                </DashCard>
            </div>
            <div className="col-12 col-md-4 col-lg-3 justify-content-center d-flex me-auto">
                <DashCard title="" className="mb-0">
                    <div className="d-flex justify-content-between fw-normal">

                    </div>
                </DashCard>
            </div>
        </DashContainer>
    )
}
