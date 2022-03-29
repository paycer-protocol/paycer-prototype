import loyaltyTiers from "@config/loyalty-tiers";
import useStaking from "@hooks/use-staking";
import useWallet from "@hooks/use-wallet";
import { Trans } from "@lingui/macro";
import CreditCardTeaser from "./credit-card-teaser";
import TierTile from "./tier-tile";


const TierList = () => {
    const { isConnected } = useWallet()
    const { stakedBalance } = useStaking()

    return (
        <div>
            <h2 className="display-4 mb-5">
                <Trans>Minting Tiers</Trans>
            </h2>
            <div className="row">
                {
                    loyaltyTiers.map((loyaltyTier) => {
                        return (
                            <div className="col-xl-4">
                                <TierTile isConnected={isConnected} loyaltyTier={loyaltyTier} stakedBalance={stakedBalance} />
                            </div>
                        );
                    })
                }
                <div className="col-xl-4">
                    <CreditCardTeaser />
                </div>
            </div>
        </div>
    )
}

export default TierList