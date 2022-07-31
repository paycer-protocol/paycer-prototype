import loyaltyTiers from "@config/loyalty-tiers"
import useStaking from "@hooks/use-staking"
import { t } from "@lingui/macro"
import TierTile from "./tier-tile"
import {useDapp} from "@context/dapp-context"

const TierList = () => {
    const { isAuthenticated } = useDapp()
    const { stakedBalance } = useStaking()

    return (
        <div>
            <h2 className="display-4 mb-5">
                {t`Minting Tiers`}
            </h2>
            <div className="row">
                {
                    loyaltyTiers.map((loyaltyTier) => {
                        return (
                            <div className="col-xl-4">
                                <TierTile isConnected={isAuthenticated} loyaltyTier={loyaltyTier} stakedBalance={stakedBalance} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TierList