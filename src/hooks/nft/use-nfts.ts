import nftProvider from '@providers/nft';
import Nft, { OpenseaMetadata } from '../../types/nft';
import { ChainId } from '@usedapp/core';
import axios from "axios";
import { useEffect, useState } from "react";
import { useDapp } from "@context/dapp-context";
import Moralis from 'moralis';
import { BigNumber } from 'ethers';

interface Property {
    color: BigNumber;
    uri: string;
    features: BigNumber[];
}

function withIpfsGateway(url: string) {
    if (url.startsWith('ipfs://')) {
        return `https://ipfs.io/ipfs/${url.split('ipfs://')[1]}`;
    } else {
        return url;
    }
}

export async function fetchTokensById(currentNetworkId: number, tokenIds: Nft['id'][]): Promise<Nft[]> {
    const { address: contractAddress, abi } = (nftProvider[currentNetworkId] || nftProvider[ChainId.Polygon]).nft;

    const tokenUris = (await Promise.all(tokenIds.map((tokenId) => {
        return Moralis.executeFunction({
            abi,
            contractAddress,
            functionName: 'tokenURI',
            params: {
                tokenId,
            },
        })
    }))) as unknown as string[];

    console.log(tokenUris);

    const owners = (await Promise.all(tokenIds.map((tokenId) => {
        return Moralis.executeFunction({
            abi,
            contractAddress,
            functionName: 'ownerOf',
            params: {
                tokenId,
            },
        })
    }))) as unknown as string[];

    const ipfsMetadata = (await Promise.all(tokenUris.map((tokenUri) => {
        return axios.get<OpenseaMetadata>(withIpfsGateway(tokenUri)).then((response) => response.data);
    })))

    return tokenIds.map((tokenId, index) => ({
        id: tokenId,
        metadata: ipfsMetadata[index],
    }));
}

export type UseNftsProps = {
    status: 'loading';
} | {
    status: 'success';
    nfts: Nft[];
} | {
    status: 'error';
};

export default function useNfts(tokenIds: Nft['id'][]): UseNftsProps {
    const { currentNetworkId, walletAddress: owner, isAuthenticated, isWeb3Enabled } = useDapp()

    const [status, setStatus] = useState<UseNftsProps>({ status: 'loading' })

    useEffect(() => {
        if (!owner || !isAuthenticated || !isWeb3Enabled) return;
        fetchTokensById(currentNetworkId, tokenIds)
            .then((nfts) => setStatus({ status: 'success', nfts }))
            .catch(() => setStatus({ status: 'error' }));
    }, [currentNetworkId, isAuthenticated, isWeb3Enabled, owner]);

    return status;
}