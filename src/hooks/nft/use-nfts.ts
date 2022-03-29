import useWallet from '@hooks/use-wallet';
import nftProvider from '@providers/nft';
import Nft from './nft';
import { ChainId, useContractCalls } from '@usedapp/core';
import axios from "axios";
import { Interface } from 'ethers/lib/utils';
import { useEffect, useMemo, useState } from "react";
import loyaltyTiers from '@config/loyalty-tiers';

interface OpenseaMetadata {
    name: string;
    description: string;
    image: string;
    attributes: {
        display_type?: string;
        trait_type: string;
        value: string | boolean | number;
    }[];
}

function withIpfsGateway(url: string) {
    if (url.startsWith('ipfs://')) {
        return `https://ipfs.io/ipfs/${url.split('ipfs://')[1]}`;
    } else {
        return url;
    }
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
    const { chainId } = useWallet();

    const { address: contractAddress, abi } = (nftProvider[chainId] || nftProvider[ChainId.Mumbai]).contract;
    const abiInterface = useMemo(() => new Interface(abi), [abi]);

    const properties = useContractCalls(tokenIds.map((tokenId) => tokenId !== undefined && ({
        abi: abiInterface,
        address: contractAddress,
        method: 'properties',
        args: [tokenId],
    })));

    const owners = useContractCalls(tokenIds.map((tokenId) => tokenId !== undefined && ({
        abi: abiInterface,
        address: contractAddress,
        method: 'ownerOf',
        args: [tokenId],
    }))).map((result) => result ? result[0] : undefined);

    const tiers = useContractCalls(tokenIds.map((tokenId) => tokenId !== undefined && ({
        abi: abiInterface,
        address: contractAddress,
        method: 'startLevel',
        args: [tokenId],
    }))).map((result) => result ? result[0] : undefined);

    const jsonUrls = properties.map((prop) => prop ? withIpfsGateway(prop[1]) : undefined);

    const [result, setResult] = useState<UseNftsProps>({ status: 'loading' });

    useEffect(() => {
        async function fetch() {
            try {
                if (jsonUrls.includes(undefined)) {
                    setResult({ status: 'loading' });
                    return;
                }
                const results = await Promise.all(jsonUrls.map((url) => axios.get<OpenseaMetadata>(url)));
                setResult({
                    status: 'success',
                    nfts: results.map((result, i) => ({
                        id: tokenIds[i],
                        name: result.data.name,
                        description: result.data.description,
                        owner: owners[i],
                        image: withIpfsGateway(result.data.image),
                        tier: loyaltyTiers[tiers[i] - 1],
                        attributes: result.data.attributes.map((attribute) => ({
                            displayType: attribute.display_type,
                            traitType: attribute.trait_type,
                            value: attribute.value,
                        })),
                    })),
                });
            } catch (err) {
                setResult({ status: 'error' })
            }
        }
        fetch();
    }, [jsonUrls.join(',')]);

    return result;
}