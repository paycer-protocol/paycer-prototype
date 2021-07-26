import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { t } from '@lingui/macro'
import Card from '@components/molecules/card'
import { Money, FormattedNumber } from '@components/atoms/number'
import Button from '@components/atoms/button'
import InvestModal from '@components/organisms/invest/invest-modal'
import { InvestmentStrategy } from '../../../../types/investment'
import mapRiskLevel from "../../../../helper/map-risk-level";

const PaycerStrategyBadge = styled.div`
    position: absolute;
    transform: rotate(45deg);
    right: -32px;
    top: 14px;
    line-height: 25px;
    font-size: 7.5px;
    width: 115px;
    padding-left: 3px;
    text-align: center;
    font-weight: 900;
    color: white;
    text-shadow: rgb(0 0 0) -1px 1px 7px;
    height: 18px;
    justify-content: center;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    background: linear-gradient(324deg ,#3c039a,#b289f5);
    letter-spacing: 0.1px;
    
    &:before {
        content: "";
        height: 16px;
        border-top: 0.5px dashed #0e400e;
        border-bottom: 0.5px dashed #0e400e;
        width: 100%;
        position: absolute;
     
    }
    
    ${props => props.strategyType === 'paycer' && css`
      background: linear-gradient(324deg, #e224a2,#ffbdbd);
      &:before {
        border-color: #244166;
      }
    `}
`

const InvestCard = (props: InvestmentStrategy) => {
    const {
        strategyName,
        interestRate,
        rewardRate,
        assets,
        tvl,
        invested,
        earnedInterest,
        investSymbol,
        riskLevel,
        strategyType
    } = props

    const [showInvestModal, setShowInvestModal] = useState(false)
    const totalInterestRate = interestRate + rewardRate;

    const onHide = () => {
        setShowInvestModal(false)
    }
    return (
        <Card className="box-shadow overflow-hidden">
            <Card.Body>
                <PaycerStrategyBadge strategyType={strategyType}>
                    {(strategyType === 'paycer' &&
                      <>{t`by`}&nbsp;</>
                    )}
                    {strategyType}
                </PaycerStrategyBadge>

                <div className="mb-3">
                    <h6 className="text-uppercase text-center my-4 font-size-lg">
                        { strategyName }
                    </h6>
                    <div className="row g-0 align-items-center justify-content-center">
                        <div className="col-auto">
                            <div className="h2 mb-0">%</div>
                        </div>
                        <div className="col-auto">
                            <div className="display-2 mb-0">
                                {totalInterestRate}
                            </div>
                        </div>
                    </div>
                    <div className="h6 text-uppercase text-center">
                        / {t`APR`}
                    </div>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex align-items-center justify-content-between px-0">
                        <span className="">Assets</span>
                        <div className="d-flex justify-content-center">
                            {assets.map((asset, key) => (
                                <img width="32" key={key} src={asset.imgPath} alt={asset.name} />
                            ))}
                        </div>
                    </li>
                    <li className="list-group-item d-flex align-items-center justify-content-between px-0">
                        <span className="">
                            {t`Total Volume`}
                        </span>
                        <span className="">
                            <Money value={tvl}/>
                        </span>
                    </li>
                    <li className="list-group-item d-flex align-items-center justify-content-between px-0">
                        <span className="">
                             {t`Deposited`}
                        </span>
                        {invested ? (
                            <span className="link-invest">
                                <Money value={invested} />
                            </span>
                        ) :
                        <>-</>
                        }
                    </li>
                    <li className="list-group-item d-flex align-items-center justify-content-between px-0">
                        <span className="">
                            {t`Earned`}
                        </span>
                        <span className="">
                            <FormattedNumber
                              value={earnedInterest}
                              minimumFractionDigits={2}
                              maximumFractionDigits={4}
                            />
                            &nbsp;
                            {investSymbol}
                        </span>
                    </li>

                    <li className="list-group-item d-flex align-items-center justify-content-between px-0">
                        <span className="">
                            {t`Risk`}
                        </span>
                        {mapRiskLevel(riskLevel)}
                    </li>
                </ul>

                <Button onClick={() => setShowInvestModal(true)} variant={'outline-primary'} className='w-100'>
                    {invested ? t`Edit invest` : t`Start invest`}
                </Button>
            </Card.Body>
            <InvestModal
                {...props}
                show={showInvestModal}
                onHide={onHide}
            />
        </Card>
    )
}

export default InvestCard
