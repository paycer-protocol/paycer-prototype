import React from 'react'
import Card from '@components/molecules/card'
import { InvestProps } from '../types'

export default function InvestCardHeader({ title, interestRate, rewardRate }: InvestProps) {
    return (
        <Card.Header>
            <div className="d-flex align-items-center justify-content-between">
                <h2 className="mb-0">{title}</h2>
                <span>{interestRate + rewardRate}% APY</span>
            </div>
        </Card.Header>
    )
}
