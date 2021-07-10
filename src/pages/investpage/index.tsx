import React from 'react'
import { Trans } from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import Button from '@components/atoms/button'
import InvestCard from './components/invest-card'

const investCardFixtures = [
    {
        title: 'Basic Plan',
        percentageRate: '12',
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
        deposited: 1283.59,
        earned: 50,
        currency: 'PCR'
    },
    {
        title: 'Advanced Plan',
        percentageRate: '15',
        hasInvested: false,
        assets : [
            {
                name: 'usdt',
                imgPath: 'assets/token/svg/color/usdt.svg'
            },
            {
                name: 'usdc',
                imgPath: 'assets/token/svg/color/usdc.svg'
            }
        ],
        tvl: 48398090.938,
        deposited: 0,
        earned: 100,
        currency: 'PCR'
    },
    {
        title: 'Expert Plan',
        percentageRate: '19',
        hasInvested: false,
        assets : [
            {
                name: 'usdc',
                imgPath: 'assets/token/svg/color/usdc.svg'
            },
            {
                name: 'bnb',
                imgPath: 'assets/token/svg/color/bnb.svg'
            }
        ],
        tvl: 78398090.938,
        deposited: 0,
        earned: 150,
        currency: 'PCR'
    },
]

export default () => {
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
                            <Trans>Create Plan</Trans>
                        </Button>

                    </div>
                </div>
            </PageHeader>
            <div className="row">
                {investCardFixtures.map((data, key) => (
                    <div key={key} className="col-12 col-md-6 col-lg-4">
                        <InvestCard
                            { ...data }
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
