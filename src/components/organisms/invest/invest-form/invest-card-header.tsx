import React from 'react'
import { Trans } from '@lingui/macro'
import Card from '@components/molecules/card'
import { InvestmentStrategy } from '@types/investment'

export default function InvestCardHeader({ strategyName, interestRate, rewardRate }: InvestmentStrategy) {
    return (
        <Card.Header>
            <div className="d-flex align-items-center justify-content-between">
                <h2 className="mb-0">{strategyName}</h2>
                <span>{interestRate + rewardRate}% <Trans>APY</Trans></span>
            </div>
        </Card.Header>
    )
}
