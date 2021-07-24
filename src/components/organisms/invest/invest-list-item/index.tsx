import React from 'react'
import useToggle from '../../../../hooks/useToggle'
import styled from 'styled-components'
import { Trans, t } from '@lingui/macro'
import Card from '@components/molecules/card'
import { Money, FormattedNumber } from '@components/atoms/number'
import Button from '@components/atoms/button'
import { InvestmentStrategy } from '../../../../types/investment'
import InvestForm  from '@components/organisms/invest/invest-form'

const PaycerStrategyBadge = styled.div`
    position: absolute;
    background: linear-gradient(to left, #c13f39,#ff9999);
    -ms-transform: rotate(314deg);
    transform: rotate(314deg);
    left: -37px;
    top: 11px;
    font-size: 10px;
    width: 110px;
    text-align: center;
    font-weight: 900;
    color: white;
    text-shadow: rgb(19 31 29 / 100%) 2px 2px 10px;
    height: 18px;
    justify-content: center;
    display: flex;
    align-items: center;
    text-transform: uppercase;
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
    } = props

    const [showInvestForm, setShowInvestForm] = useToggle();
    const totalInterestRate = interestRate + rewardRate;

    return (
        <>
            <Card className={showInvestForm ? 'mb-3 overflow-hidden' : 'mb-4 overflow-hidden'}>
                <Card.Body className="pt-4 pb-4">
                    <div className="d-flex justify-content-between">

                        {strategyType === 'paycer' && (
                            <PaycerStrategyBadge>
                                <Trans>Paycer</Trans>
                            </PaycerStrategyBadge>
                        )}

                        <div className="row w-100">
                            <div className="col-md-2 d-flex align-items-center">
                                {strategyName}&nbsp;<span className="fw-bold">{totalInterestRate}%</span>&nbsp;/ <Trans>APR</Trans>
                            </div>

                            <div className="col-md-2 d-flex justify-content-center flex-column">
                                <div className="d-flex">
                                    {assets.map((asset, key) => (
                                        <img className="me-2" width="30" key={key} src={asset.imgPath} alt={asset.name} />
                                    ))}
                                </div>
                            </div>
                            <div className="col-md-2 d-flex justify-content-center flex-column">
                                <Money value={tvl}/>
                            </div>

                            <div className="col-md-2 d-flex justify-content-center flex-column">
                                <Money value={invested} />
                            </div>

                            <div className="col-md-2 d-flex justify-content-center flex-column">
                                <FormattedNumber
                                    value={earnedInterest}
                                    minimumFractionDigits={2}
                                    maximumFractionDigits={4}
                                />
                                &nbsp;
                                {investSymbol}
                            </div>
                            <div className="col-md-2 d-flex justify-content-center flex-column pe-0">
                                <Button onClick={setShowInvestForm} variant={showInvestForm ? 'primary' : 'outline-primary'}>
                                    {invested ? t`Edit invest` : t`Start invest`}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
            {showInvestForm && (
                <div className="mb-4">
                    <InvestForm {...props} />
                </div>
            )}
        </>

    )
}

export default InvestCard
