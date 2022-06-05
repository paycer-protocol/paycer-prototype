import nftProvider from '@providers/nft';
import { ChainId, useContractCall, useContractCalls } from "@usedapp/core";
import { useMemo } from "react";
import { Interface } from "@ethersproject/abi";
import useNfts, { UseNftsProps } from "./use-nfts";
import {useDapp} from "@context/dapp-context";

/* TODO: REFACTOR FOR MORALIS */

export default function useOwnedNfts(): UseNftsProps {
    const { currentNetworkId, walletAddress: owner, isAuthenticated } = useDapp()

    const { address: contractAddress, abi } = (nftProvider[currentNetworkId] || nftProvider[ChainId.Mumbai]).nft;
    const abiInterface = useMemo(() => new Interface(abi), [abi]);

    const [numberOfTokens] = useContractCall(isAuthenticated && {
        abi: abiInterface,
        address: contractAddress,
        method: 'balanceOf',
        args: [owner],
    }) ?? [];

    const tokenIds = (
        useContractCalls(Array.from({length: numberOfTokens ?? 0}, (_, i) => ({
            abi: abiInterface,
            address: contractAddress,
            method: 'tokenOfOwnerByIndex',
            args: [owner, i],
        })))
    ).map((result) => result ? result[0] : undefined);

    return useNfts(tokenIds);
}