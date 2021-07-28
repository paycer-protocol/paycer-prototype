import React from 'react'
import styled from 'styled-components'
import { t, Trans } from '@lingui/macro'
import useLoyaltyTiers from '@hooks/use-loyalty-tiers'
import LoyaltyTierLevel from './loyalty-tier-level.tsx'

const RewardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 15px;
  height: 242px;
`

const LoyaltyTiers = () => {


    const tiers = useLoyaltyTiers()

    const tierLevel = tiers.loyaltyTierOf()


    return (
        <div className="row">
            <div className="col-md-3">
                <LoyaltyTierLevel
                    level={t`Accociate`}
                />
            </div>
            <div className="col-md-3">
                <LoyaltyTierLevel
                    level={t`Senior`}
                />
            </div>
            <div className="col-md-3">
                <LoyaltyTierLevel
                    level={t`Manager`}
                />
            </div>
            <div className="col-md-3">
                <LoyaltyTierLevel
                    level={t`Partner`}
                />
            </div>
        </div>
    )
}


export default LoyaltyTiers
