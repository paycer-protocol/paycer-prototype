import React from 'react'
import { Trans } from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import DashCards from './components/dash-cards'
import Portfolio from './components/portfolio'
import { StrategyType } from '../../types/investment'
import {investmentStrategies} from '@config/investment/strategies'
import useToken from '@hooks/use-token'
import {strategyProvider} from "@providers/strategies";

interface PortfolioStrategy extends StrategyType {
  balance?: number
  tvl?: number
}

const colorMap = {
    "basic" : '#6808C0',
    "advanced" : '#8D0EA2',
    "expert" : '#3C01E3',
}

export default function Home() {
  const qualifiedStrategies = []
  let totalBalance = 0

  investmentStrategies.map((strategy) => {
    const token = strategy.output
    const outputToken = useToken(token.symbol)
    const tokenBalance = Math.random() * 10000 // outputToken.tokenBalance()

    totalBalance += tokenBalance

    if (tokenBalance > 0) {
      qualifiedStrategies.push({
        ...strategy,
        ...{
          balance: tokenBalance,
          tvl: 12712983,
            color: colorMap[strategy.name.toLowerCase()]

        }
      } as PortfolioStrategy)
    }
  })

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
        </div>
      </PageHeader>
      <div className="blur-background">
          <div className="mb-7 mb-md-3">
            <DashCards
                totalBalance={totalBalance}
                strategies={qualifiedStrategies}
            />
          </div>
          <div className="row position-relatives">
            <div className="col-12">
              <Portfolio
                strategies={qualifiedStrategies}
                totalBalance={totalBalance}
              />
            </div>
          </div>
      </div>
    </div>
  )
}

