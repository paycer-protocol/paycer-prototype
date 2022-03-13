import React from 'react'
import Header from '@components/organisms/portfolio/portfolio-header'
import PortfolioList from '@components/organisms/portfolio/portfolio-list'
import { StrategyType } from '../../../types/investment'
import { investmentStrategies } from '@config/investment/strategies'
import usePortfolio from '@hooks/use-portfolio'
import useWallet from '@hooks/use-wallet'

interface PortfolioStrategy extends StrategyType {
    balance?: number
    tvl?: number
}

export default function Portfolio() {
    const qualifiedStrategies = []
    const { isConnected } = useWallet()
    let totalBalance = 0

    investmentStrategies.map((strategy) => {
        const { isWithdrawAble, withdrawAble } = usePortfolio(strategy)
        if (isWithdrawAble) {
            totalBalance += withdrawAble
            qualifiedStrategies.push({
                ...strategy,
                ...{
                    balance: withdrawAble,
                    color: strategy.color
                }
            } as PortfolioStrategy)
        }
    })

    return (
        <>
            <div>
                <div className="mb-7 mb-md-3">
                    <Header
                        totalBalance={totalBalance}
                        strategies={qualifiedStrategies}
                    />
                </div>
                <div className="row position-relatives blur-background">
                    <div className="col-12">
                        <PortfolioList
                            strategies={qualifiedStrategies}
                            totalBalance={totalBalance}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

