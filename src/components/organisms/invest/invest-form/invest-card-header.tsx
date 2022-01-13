import React from 'react'
import { Trans } from '@lingui/macro'
import Card from '@components/molecules/card'
import { StrategyType } from '../../../../types/investment'

export default function InvestCardHeader(props: StrategyType) {
    return (
        <Card.Header>
            <div className="d-flex align-items-center justify-content-between">
                <h2 className="mb-0">{props.name}</h2>
                <span>{props.interest.interestRate + props.rewards.rewardRate}% <Trans>APR</Trans></span>
            </div>
        </Card.Header>
    )
}
