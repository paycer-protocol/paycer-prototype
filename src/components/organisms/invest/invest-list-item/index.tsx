import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import mapRiskLevel from '../../../../helper/map-risk-level'
import { t } from '@lingui/macro'
import Card from '@components/molecules/card'
import { Money, FormattedNumber } from '@components/atoms/number'
import Button from '@components/atoms/button'
import { InvestmentStrategy } from '../../../../types/investment'
import InvestForm  from '@components/organisms/invest/invest-form'

const PaycerStrategyBadge = styled.div`
    position: absolute;
    transform: rotate(45deg);
    right: -36px;
    top: 11px;
    font-size: 9px;
    width: 110px;
    text-align: center;
    font-weight: 900;
    color: white;
    text-shadow: rgb(19 31 29 / 100%) 2px 2px 10px;
    height: 16px;
    justify-content: center;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    background: linear-gradient(to left,#5b862b,#3f827b);
    
    ${props => props.strategyType === 'paycer' && css`
      background: linear-gradient(to left, #b73d70,#f9a7dc);
    `}
`

const InvestCard = (props: InvestmentStrategy) => {
    const {
        strategyName,
        strategyType,
        interestRate,
        rewardRate,
        assets,
        tvl,
        invested,
        earnedInterest,
        investSymbol,
        riskLevel
    } = props

    const [showInvestForm, setShowInvestForm] = useState(false)
    const totalInterestRate = interestRate + rewardRate

    return (
        <>
            <Card className={showInvestForm ? 'mb-3 overflow-hidden' : 'mb-4 overflow-hidden'}>
                <Card.Body className="pt-4 pb-4">
                    <div className="d-flex justify-content-between">

                        <PaycerStrategyBadge strategyType={strategyType}>
                            {strategyType}
                        </PaycerStrategyBadge>

                        <div className="row w-100">
                            <div className="col-md-2 d-flex justify-content-center flex-column">
                                <div className="d-flex">
                                    {assets.map((asset, key) => (
                                        <img className="me-2" width="32" key={key} src={asset.imgPath} alt={asset.name} />
                                    ))}
                                </div>
                            </div>
                            <div className="col-md-1 d-flex align-items-center">
                                {strategyName}
                            </div>

                            <div className="col-md-1 d-flex align-items-center justify-content-center">
                                <span className="fw-bold">{totalInterestRate}%</span>
                            </div>

                            <div className="col-md-2 d-flex align-items-center justify-content-center">
                                {mapRiskLevel(riskLevel)}
                            </div>

                            <div className="col-md-2 d-flex justify-content-center flex-column">
                                <span className="link-invest"><Money value={invested} /></span>
                            </div>

                            <div className="col-md-1 d-flex justify-content-center flex-column">
                                <FormattedNumber
                                    value={earnedInterest}
                                    minimumFractionDigits={2}
                                    maximumFractionDigits={4}
                                />
                                &nbsp;
                                {investSymbol}
                            </div>
                            <div className="col-md-2 d-flex justify-content-center flex-column">
                                <Money value={tvl}/>
                            </div>
                            <div className="col-md-1 d-flex justify-content-center flex-column pe-0">
                                <Button onClick={() => setShowInvestForm(!showInvestForm)} variant={showInvestForm ? 'primary' : 'outline-primary'}>
                                    {invested ? t`Edit` : t`Start`}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
            {showInvestForm && (
                <div className="mb-4">
                    <InvestForm
                        {...props}
                        setShowInvestForm={setShowInvestForm}
                    />
                </div>
            )}
        </>

    )
}

export default InvestCard
