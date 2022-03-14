import React from 'react'
import Header from '@components/organisms/portfolio/portfolio-header'
import PortfolioList from '@components/organisms/portfolio/portfolio-list'
import usePortfolio from '@hooks/use-portfolio'
import useWallet from "@hooks/use-wallet";

export default function Portfolio() {
    const { qualifiedStrategies, totalInvest } = usePortfolio()
    return (
        <>
            <div>
                <div className="mb-7 mb-md-3">
                    <Header
                        totalInvest={totalInvest}
                        strategies={qualifiedStrategies}
                    />
                </div>
                <div className="row position-relatives blur-background">
                    <div className="col-12">
                        <PortfolioList
                            strategies={qualifiedStrategies}
                            totalInvest={totalInvest}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

