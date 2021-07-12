import React from 'react'
import Card from '@components/molecules/card'

interface InvestCardHeaderProps {
    title: string;
    percentageRate: number;
}

export default function InvestCardHeader({ title, percentageRate }: InvestCardHeaderProps) {
    return (
        <Card.Header>
            <div className="d-flex align-items-center justify-content-between">
                <h2 className="mb-0">{title}</h2>
                <span>{percentageRate}% APY</span>
            </div>
        </Card.Header>
    )
}
