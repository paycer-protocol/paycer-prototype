import nftProvider from '@providers/nft';
import Nft, { OpenseaMetadata } from '../../types/nft';
import { ChainId } from '@usedapp/core';
import axios from "axios";
import { useEffect, useState } from "react";
import { useDapp } from "@context/dapp-context";
import Moralis from 'moralis';
import { BigNumber } from 'ethers';
import { allNetProviers } from '@providers/networks';

interface Property {
    color: BigNumber;
    uri: string;
    features: BigNumber[];
}

export function withIpfsGateway(url: string) {
    if (url.startsWith('ipfs://')) {
        return `https://gateway.pinata.cloud/ipfs/${url.split('ipfs://')[1]}`;
    } else {
        return url;
    }
}

export async function fetchTokensById(currentNetworkId: number, tokenIds: Nft['id'][]): Promise<Nft[]> {
    const chainId = allNetProviers[currentNetworkId].chainId;
    const { address: contractAddress, abi } = (nftProvider[currentNetworkId] || nftProvider[ChainId.Polygon]).nft;

    const tokenUris = (await Promise.all(tokenIds.map((tokenId) => {
        const options = {
            abi,
            chain: chainId as any,
            address: contractAddress,
            function_name: 'tokenURI',
            params: {
                tokenId,
            },
        }
        return Moralis.Web3API.native.runContractFunction(options)
    }))) as unknown as string[];

    const owners = (await Promise.all(tokenIds.map((tokenId) => {
        const options = {
            abi,
            chain: chainId as any,
            address: contractAddress,
            function_name: 'ownerOf',
            params: {
                tokenId,
            },
        }
        return Moralis.Web3API.native.runContractFunction(options)
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