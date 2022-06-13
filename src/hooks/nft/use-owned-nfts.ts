import nftProvider from '@providers/nft';
import { useEffect, useState } from "react";
import { fetchTokensById, UseNftsProps } from "./use-nfts";
import { useDapp } from "@context/dapp-context";
import Moralis from 'moralis';
import ChainId from '@providers/chain-id';
import { BigNumber } from 'ethers';

async function fetchOwnedTokenIds(currentNetworkId: number, owner: string): Promise<BigNumber[]> {
    const { address: contractAddress, abi } = (nftProvider[currentNetworkId] || nftProvider[ChainId.Polygon]).nft;

    const numTokens = ((await Moralis.executeFunction({
        abi,
        contractAddress,
        functionName: 'balanceOf',
        params: {
            owner,
        },
    })) as unknown as BigNumber).toNumber();

    const tokenIds = (await Promise.all(Array.from({ length: numTokens }, (_, index) => {
        return Moralis.executeFunction({
            abi,
            contractAddress,
            functionName: 'tokenOfOwnerByIndex',
            params: {
                owner,
                index,
            },
        })
    }))) as unknown as BigNumber[];

    return tokenIds;
}

export default function useOwnedNfts(): UseNftsProps {
    const { currentNetworkId, walletAddress: owner, isAuthenticated, isWeb3Enabled } = useDapp()

    const [status, setStatus] = useState<UseNftsProps>({ status: 'loading' })

    useEffect(() => {
        if (!owner || !isAuthenticated || !isWeb3Enabled) return;
        setStatus({ status: 'loading' })
        fetchOwnedTokenIds(currentNetworkId, owner)
            .then((tokenIds) => fetchTokensById(currentNetworkId, tokenIds))
            .then((nfts) => setStatus({ status: 'success', nfts }))
            .catch(() => setStatus({ status: 'error' }))
    }, [currentNetworkId, isAuthenticated, isWeb3Enabled, owner]);

    return status;
}