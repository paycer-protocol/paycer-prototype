import React from 'react'
import styled from 'styled-components'
import { t, Trans } from '@lingui/macro'
import Button from '@components/atoms/button'
import { FormattedNumber } from '@components/atoms/number/formatted-number'
import DashNumber from '@components/organisms/dashboard/dash-number'
import useStakingRewards from '@hooks/use-staking-rewards'
import { rewardSymbol } from '@config/staking-rewards'
import classnames from "classnames";
import LoyaltyTierLevel from './loyalty-tier-level.tsx'
import useWallet from "@hooks/use-wallet";

const RewardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 15px;
  height: 242px;
`

const LoyaltyTiers = () => {

    const wallet = useWallet()

    console.log(wallet)


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
