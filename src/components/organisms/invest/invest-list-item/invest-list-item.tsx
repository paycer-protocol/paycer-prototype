import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import mapRiskLevel from '../../../../helper/map-risk-level'
import { t } from '@lingui/macro'
import Card from '@components/molecules/card'
import { Money, FormattedNumber } from '@components/atoms/number'
import Button from '@components/atoms/button'
import { StrategyType } from '../../../../types/investment'
import InvestForm  from '@components/organisms/invest/invest-form'
import useToken from '@hooks/use-token'

const PaycerStrategyBadge = styled.div`
    position: absolute;
    transform: rotate(45deg);
    right: -38px;
    top: 9px;
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

const StyledCard = styled(Card)`
   ${props => props.showInvestForm && css`
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom: 0;
   `}  
`


const InvestListItem = (props: StrategyType) => {
    const [showInvestForm, setShowInvestForm] = useState(false)
    const totalInterestRate = props.interest.interestRate + props.rewards.rewardRate
    const investedToken = useToken(props.output.symbol)
    const investedBalance = investedToken.tokenBalance()

    return (
        <>
            <StyledCard showInvestForm={showInvestForm} className={showInvestForm ? 'mb-0 overflow-hidden bg-dark' : 'mb-3 overflow-hidden'}>
                <Card.Body className="pt-4 pb-4">
                    <div className="d-flex justify-content-between">

                        {/*<PaycerStrategyBadge strategyType={strategyType}>*/}
                        {/*    {(strategyType === 'paycer' &&*/}
                        {/*        <>{t`by`}&nbsp;</>*/}
                        {/*    )}*/}
                        {/*    {strategyType}*/}
                        {/*</PaycerStrategyBadge>*/}

                        <div className="row w-100">
                            <div className="col-md-2 d-flex align-items-center">
                                {props.name}
                            </div>

                            <div className="col-md-2 d-flex justify-content-center flex-column">
                                <div className="d-flex">
                                    {props.assets.map((asset, key) => (
                                      <img className="me-2" width="32" key={key} src={asset.imgPath} alt={asset.name} />
                                    ))}
                                </div>
                            </div>

                            <div className="col-md-1 d-flex align-items-center justify-content-center">
                                {totalInterestRate}%
                            </div>

                            <div className="col-md-2 d-flex align-items-center justify-content-center">
                                {mapRiskLevel(props.riskLevel)}
                            </div>

                            <div className="col-md-2 d-flex justify-content-center flex-column">
                                {
                                    investedBalance > 0
                                      ? (
                                        <>
                                            <FormattedNumber
                                              value={investedBalance}
                                              minimumFractionDigits={2}
                                              maximumFractionDigits={4}
                                            />
                                            &nbsp;{investedToken.symbol}
                                        </>
                                      )
                                      : (
                                        <span>-</span>
                                      )
                                }
                            </div>

                            <div className="col-md-2 d-flex justify-content-center flex-column">
                                -
                            </div>
                            <div className="col-md-1 d-flex justify-content-center flex-column pe-0">
                                <Button style={{position: 'relative', left: '-20px'}} onClick={() => setShowInvestForm(!showInvestForm)} active={showInvestForm} variant="primary">
                                    {investedBalance ? t`Edit` : t`Start`}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </StyledCard>
            {showInvestForm && (
                <div className="mb-4">
                    <InvestForm
                        {...props}
                        setShowInvestForm={setShowInvestForm}
                        isModal={false}
                    />
                </div>
            )}
        </>

    )
}

export default InvestListItem
