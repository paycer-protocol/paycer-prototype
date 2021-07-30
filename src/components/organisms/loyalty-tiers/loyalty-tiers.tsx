import React from 'react'
import styled from 'styled-components'
import { t, Trans } from '@lingui/macro'
import * as LoyaltyTiersConfig from '../../../config/loyalty-tiers'
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


    /*
    const tierLevel = tiers.getLoyaltyTierOf()
    const baseRewardRateOf = tiers.getBaseRewardRateOf()
    const interestRateOf = tiers.getInterestRateOf()
    const discountRateOf = tiers.getDiscountRateOf()
     */

    const paycerBalance = 0

    const tierLevel = 4
    const baseRewardRateOf = tiers.getBaseRewardRateOf()
    const interestRateOf = 450
    const discountRateOf = 2000
    const votingWeight = tiers.getVotingWeight()

    return (
        <div className="row">
            <div className="col-md-3">
                <LoyaltyTierLevel
                    level={t`Accociate`}
                    rewardRate={baseRewardRateOf * LoyaltyTiersConfig.rewardRateMp_accociate}
                    loanFeeDiscount={LoyaltyTiersConfig.loanFeeDiscount_accociate}
                    additionalFiatInterest={LoyaltyTiersConfig.additionalFiatInterest_accociate}
                    votingWeight={votingWeight}
                />
            </div>
            <div className="col-md-3">
                <LoyaltyTierLevel
                    level={t`Senior`}
                    rewardRate={baseRewardRateOf * LoyaltyTiersConfig.rewardRateMp_senior}
                    loanFeeDiscount={LoyaltyTiersConfig.loanFeeDiscount_senior}
                    additionalFiatInterest={LoyaltyTiersConfig.additionalFiatInterest_senior}
                    votingWeight={votingWeight}
                />
            </div>
            <div className="col-md-3">
                <LoyaltyTierLevel
                    level={t`Manager`}
                    rewardRate={baseRewardRateOf * LoyaltyTiersConfig.rewardRateMp_manager}
                    loanFeeDiscount={LoyaltyTiersConfig.loanFeeDiscount_manager}
                    additionalFiatInterest={LoyaltyTiersConfig.additionalFiatInterest_manager}
                    votingWeight={votingWeight}
                />
            </div>
            <div className="col-md-3">
                <LoyaltyTierLevel
                    isActive={tierLevel === 4}
                    level={t`Partner`}
                    rewardRate={baseRewardRateOf * LoyaltyTiersConfig.rewardRateMp_partner}
                    loanFeeDiscount={LoyaltyTiersConfig.loanFeeDiscount_partner}
                    additionalFiatInterest={LoyaltyTiersConfig.additionalFiatInterest_partner}
                    votingWeight={votingWeight}
                />
            </div>
        </div>
    )
}


export default LoyaltyTiers
