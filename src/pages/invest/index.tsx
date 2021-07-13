import React, { useState } from 'react'
import PageHeader from '@components/molecules/page-header'
import Button from '@components/atoms/button'
import InvestCard from '@components/organisms/invest/invest-card'
import WalletProvider from '@components/organisms/web3/wallet-provider'
import { connectors } from '@components/organisms/web3/providers'
import { InvestProps } from '@components/organisms/invest/types'

const investCardFixtures: InvestProps[] = [
    {
        title: 'Basic Plan',
        interestRate: 3,
        rewardRate: 8,
        hasInvested: true,
        assets : [
            {
                name: 'usdt',
                imgPath: 'assets/token/svg/color/usdt.svg'
            },
            {
                name: 'usdc',
                imgPath: 'assets/token/svg/color/usdc.svg'
            },
            {
                name: 'bnb',
                imgPath: 'assets/token/svg/color/bnb.svg'
            }
        ],
        tvl: 28398090.938,
        invested: 2000,
        rewardSymbol: 'PCR',
        earnedInterest: 50,
        earnedReward: 50,
        baseSymbol: 'USDC',
        basePriceUSD: 1,
        basePriceETH: 1,
        investSymbol: 'USDT',
        investPriceUSD: 1,
        investPriceETH: 1,
        investFee: 0.02,
        withdrawFee: 0.01,
        feeSymbol: 'USDT',

    },
    {
        title: 'Advanced Plan',
        interestRate: 3,
        rewardRate: 8,
        hasInvested: true,
        assets : [
            {
                name: 'usdt',
                imgPath: 'assets/token/svg/color/usdt.svg'
            },
            {
                name: 'usdc',
                imgPath: 'assets/token/svg/color/usdc.svg'
            },
            {
                name: 'bnb',
                imgPath: 'assets/token/svg/color/bnb.svg'
            }
        ],
        tvl: 28398090.938,
        invested: 2000,
        rewardSymbol: 'PCR',
        earnedInterest: 50,
        earnedReward: 50,
        baseSymbol: 'USDC',
        basePriceUSD: 1,
        basePriceETH: 1,
        investSymbol: 'USDT',
        investPriceUSD: 1,
        investPriceETH: 1,
        investFee: 0.01,
        withdrawFee: 0.01,
        feeSymbol: 'USDC',
    },
    {
        title: 'Expert Plan',
        interestRate: 3,
        rewardRate: 8,
        hasInvested: true,
        assets : [
            {
                name: 'usdt',
                imgPath: 'assets/token/svg/color/usdt.svg'
            },
            {
                name: 'usdc',
                imgPath: 'assets/token/svg/color/usdc.svg'
            },
            {
                name: 'bnb',
                imgPath: 'assets/token/svg/color/bnb.svg'
            }
        ],
        tvl: 28398090.938,
        invested: 2000,
        rewardSymbol: 'PCR',
        earnedInterest: 50,
        earnedReward: 50,
        baseSymbol: 'USDC',
        basePriceUSD: 1,
        basePriceETH: 1,
        investSymbol: 'USDT',
        investPriceUSD: 1,
        investPriceETH: 1,
        investFee: 0.01,
        withdrawFee: 0.01,
        feeSymbol: 'USDC',
    },
]

export default () => {
    const [showWalletProviderModal, setShowWalletProviderModal] = useState(false)

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
                            Create Plan
                        </Button>
                    </div>
                </div>
            </PageHeader>
            <div className="row">
                {investCardFixtures.map((data, key) => (
                    <div key={key} className="col-12 col-md-6 col-lg-4">
                        <InvestCard
                            { ...data }
                            setShowWalletProviderModal={setShowWalletProviderModal}
                        />
                    </div>
                ))}
            </div>
            <WalletProvider
                providers={connectors}
                onHide={() => setShowWalletProviderModal(false)}
                show={showWalletProviderModal}
            />
        </div>
    )
}
