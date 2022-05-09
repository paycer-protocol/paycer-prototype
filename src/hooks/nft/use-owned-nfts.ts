import useWallet from "@hooks/use-wallet";
import nftProvider from '@providers/nft';
import { ChainId, useContractCall, useContractCalls } from "@usedapp/core";
import { useMemo } from "react";
import { Interface } from "@ethersproject/abi";
import useNfts, { UseNftsProps } from "./use-nfts";

export default function useOwnedNfts(): UseNftsProps {
    const { address: owner, isConnected, chainId } = useWallet();

    const { address: contractAddress, abi } = (nftProvider[chainId] || nftProvider[ChainId.Mumbai]).contract;
    const abiInterface = useMemo(() => new Interface(abi), [abi]);

    const [numberOfTokens] = useContractCall(isConnected && {
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