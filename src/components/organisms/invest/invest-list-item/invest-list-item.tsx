import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import mapRiskLevel from '../../../../helper/map-risk-level'
import { t } from '@lingui/macro'
import Card from '@components/molecules/card'
import { FormattedNumber } from '@components/atoms/number'
import Button from '@components/atoms/button'
import { StrategyType } from '../../../../types/investment'
import InvestForm  from '@components/organisms/invest/invest-form'
import useToken from '@hooks/use-token'

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
                                    {showInvestForm ? t`Hide` : t`Show`}
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
