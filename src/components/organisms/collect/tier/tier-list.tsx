import loyaltyTiers from "@config/loyalty-tiers";
import useStaking from "@hooks/use-staking";
import useWallet from "@hooks/use-wallet";
import { Trans } from "@lingui/macro";
import TierTile from "./tier-tile";


const TierList = () => {
    const { isConnected } = useWallet();
    const { stakedBalance } = useStaking();

    return (
        <div>
            <h2 className="display-4"><Trans>Minting Tiers</Trans></h2>
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
            </div>
        </div>
    );
};

export default TierList;