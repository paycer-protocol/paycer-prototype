import React from 'react'
import useToggle from '../../../../hooks/useToggle'
import styled from 'styled-components'
import { Trans, t } from '@lingui/macro'
import Card from '@components/molecules/card'
import { Money, FormattedNumber } from '@components/atoms/number'
import Button from '@components/atoms/button'
import { InvestmentStrategy } from '../../../../types/investment'
import InvestForm  from '@components/organisms/invest/invest-form'

const PaycerStrategyBadge = styled.a`
    position: absolute;
    background: linear-gradient(to left, #2c9ace,#8efaff);
    -ms-transform: rotate(314deg);
    transform: rotate(314deg);
    left: -32px;
    top: 18px;
    font-size: 10px;
    width: 110px;
    text-align: center;
    font-weight: 900;
    color: white;
    text-shadow: rgb(19 31 29 / 100%) 2px 2px 10px;
    height: 17px;
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
            <Card className="box-shadow">
                <Card.Body className="pt-3 pb-3 overflow-hidden position-relative">
                    <div className="d-flex justify-content-between align-items-center ">

                        {strategyType === 'paycer' && (
                            <PaycerStrategyBadge>
                                { strategyName}
                            </PaycerStrategyBadge>
                        )}

                        <div className="row w-100">

                            <div className="col-md-2 d-flex ps-4 flex-column">
                                <strong className="d-block">% <span className="display-2">{totalInterestRate}</span> /</strong>
                                <Trans>APR</Trans>
                            </div>

                            <div className="col-md-2 d-flex justify-content-center flex-column">
                                <div className="d-flex">
                                    {assets.map((asset, key) => (
                                        <img className="me-2" width="32" key={key} src={asset.imgPath} alt={asset.name} />
                                    ))}
                                </div>
                            </div>
                            <div className="col-md-2 d-flex justify-content-center flex-column">
                                <strong>
                                    <Money value={tvl}/>
                                </strong>
                            </div>

                            <div className="col-md-2 d-flex justify-content-center flex-column">
                                <strong className={invested ? 'link-invest' : ''}>
                                    <Money value={invested} />
                                </strong>
                            </div>

                            <div className="col-md-2 d-flex justify-content-center flex-column">
                                <strong>
                                <FormattedNumber
                                    value={earnedInterest}
                                    minimumFractionDigits={2}
                                    maximumFractionDigits={4}
                                />
                                &nbsp;
                                {investSymbol}
                                </strong>
                            </div>
                            <div className="col-md-2 d-flex justify-content-center flex-column">
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
