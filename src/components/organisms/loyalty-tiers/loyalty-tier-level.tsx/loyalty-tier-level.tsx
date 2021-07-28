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
    level: string
    isActive?: boolean
}

const LoyaltyTierLevel = (props: LoyaltyTierLevel) => {

    const {
        level,
        isActive
    } = props

    return (
        <Card>
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </Card.Text>
            </Card.Body>
        </Card>
    )


}


export default LoyaltyTierLevel
