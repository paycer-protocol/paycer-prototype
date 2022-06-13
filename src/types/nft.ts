import { LoyaltyTier } from "@config/loyalty-tiers";
import { BigNumber } from '@ethersproject/bignumber'

export interface OpenseaMetadata {
    name: string;
    description: string;
    image: string;
    background_color: string;
    animation_uri: string;
    attributes: {
        display_type?: string;
        trait_type: string;
        value: string | boolean | number;
    }[];
}

export default interface Nft {
    id: BigNumber;
    metadata: OpenseaMetadata;
}