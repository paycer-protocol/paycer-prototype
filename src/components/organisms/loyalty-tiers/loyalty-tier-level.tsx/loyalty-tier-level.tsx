import React from 'react'
import styled from 'styled-components'
import Card from "@components/molecules/card";
import {Variant} from "react-bootstrap/types";

const RewardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 15px;
  height: 242px;
`

export interface LoyaltyTierLevel {
    level: string,
    isActive?: boolean,
    rewardRate?: number,
    loanFeeDiscount?: number,
    additionalFiatInterest?: number,
    votingWeight: number
}

const LoyaltyTierLevel = (props: LoyaltyTierLevel) => {

    const {
        level,
        isActive,
        rewardRate,
        loanFeeDiscount,
        additionalFiatInterest,
        votingWeight
    } = props

    return (
        <Card className={isActive ? 'border-invest' : ''}>
            <Card.Body>
                <Card.Title>{level}</Card.Title>
                <Card.Text>
                    <div>
                        Rewardrate: {rewardRate}%
                    </div>
                    <div>
                        Load Fee Discount: {loanFeeDiscount}%
                    </div>
                    <div>
                        Additional Fiat Interest: {additionalFiatInterest}%
                    </div>
                    <div>
                        Your Voting Weight: {votingWeight}
                    </div>

                </Card.Text>
            </Card.Body>
        </Card>
    )


}


export default LoyaltyTierLevel
