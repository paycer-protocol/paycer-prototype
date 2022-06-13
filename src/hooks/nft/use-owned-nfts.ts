import nftProvider from '@providers/nft';
import { useEffect, useState } from "react";
import useNfts, { UseNftsProps } from "./use-nfts";
import { useDapp } from "@context/dapp-context";
import Moralis from 'moralis';
import ChainId from '@providers/chain-id';

export default function useOwnedNfts(): UseNftsProps {
    const { currentNetworkId, walletAddress: owner, isAuthenticated } = useDapp()

    const { address: contractAddress, abi } = (nftProvider[currentNetworkId] || nftProvider[ChainId.Polygon]).nft;

    const [tokenIds, setTokenIds] = useState(undefined)

    useEffect(() => {
        if (!isAuthenticated) return;
        (async () => {
            const numTokens = await Moralis.executeFunction({
                abi,
                contractAddress,
                functionName: 'balanceOf',
                params: {
                    owner,
                },
            })

            const tokenIds = [];
            for (let i = 0; i < numTokens; i++) {
                tokenIds.push(await Moralis.executeFunction({
                    abi,
                    contractAddress,
                    functionName: 'tokenOfOwnerByIndex',
                    params: {
                        owner,
                        i,
                    },
                }))
            }
            setTokenIds(tokenIds);
        })();
    }, [isAuthenticated]);

    useNfts(tokenIds);

    if (tokenIds === undefined) {
        return
    }
}