import { LoyaltyTier } from "@config/loyalty-tiers";
import { BigNumber } from "ethers";

export default interface Nft {
    id: BigNumber;
    name: string;
    description: string;
    owner: string;
    image: string;
    tier: LoyaltyTier;
    attributes: {
        displayType?: string;
        traitType: string;
        value: string | number | boolean;
    }[];
}