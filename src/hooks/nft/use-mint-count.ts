import loyaltyTiers, { LoyaltyTier } from "@config/loyalty-tiers";
import useWallet from "@hooks/use-wallet";
import nftProvider from '@providers/nft';
import { ChainId, useContractCall } from "@usedapp/core";
import { Interface } from "@ethersproject/abi";
import { useMemo } from "react";

/**
 * React hook that returns the number of NFTs minted for a specific loyalty tier.
 */
export default function useMintCount(tier: LoyaltyTier | undefined): number | undefined {
    const { chainId } = useWallet();

    const { address: contractAddress, abi } = (nftProvider[chainId] || nftProvider[ChainId.Mumbai]).contract;
    const abiInterface = useMemo(() => new Interface(abi), [abi]);

    const level = loyaltyTiers.indexOf(tier) + 1;

    const [count] = useContractCall(tier !== undefined && {
        abi: abiInterface,
        address: contractAddress,
        method: 'countByLevel',
        args: [level],
    }) ?? [];

    return count;
}