import useWallet from '@hooks/use-wallet';
import nftProvider from '@providers/nft';
import { ChainId, useContractCalls } from '@usedapp/core';
import axios from "axios";
import { BigNumber } from "ethers";
import { Interface } from 'ethers/lib/utils';
import { useEffect, useMemo, useState } from "react";

interface NftData {
    name: string;
    description: string;
    image: string;
    attributes: {
        trait_type: string;
        value: string | boolean | number;
    }
}

export interface Nft {
    id: BigNumber;
    name: string;
    description: string;
    image: string;
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
    const { address: owner, isConnected, chainId } = useWallet();

    const { address: contractAddress, abi } = (nftProvider[chainId] || nftProvider[ChainId.Mumbai]).contract;
    const abiInterface = useMemo(() => new Interface(abi), [abi]);

    const properties = useContractCalls(tokenIds.map((tokenId) => tokenId !== undefined && ({
        abi: abiInterface,
        address: contractAddress,
        method: 'properties',
        args: [tokenId],
    })));

    const jsonUrls = properties.map((prop) => prop ? withIpfsGateway(prop[1]) : undefined);

    const [result, setResult] = useState<UseNftsProps>({ status: 'loading' });

    useEffect(() => {
        async function fetch() {
            try {
                const results = await Promise.all(jsonUrls.map((url) => axios.get<NftData>(url)));
                setResult({
                    status: 'success',
                    nfts: results.map((result, i) => ({
                        id: tokenIds[i],
                        name: result.data.name,
                        description: result.data.description,
                        image: withIpfsGateway(result.data.image),
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