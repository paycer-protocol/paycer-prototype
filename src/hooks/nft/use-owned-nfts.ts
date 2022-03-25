import useWallet from "@hooks/use-wallet";
import nftProvider from '@providers/nft';
import { ChainId, useContractCall, useContractCalls } from "@usedapp/core";
import { useEffect, useMemo, useState } from "react";
import { Interface } from "@ethersproject/abi";
import axios from "axios";

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

export default function useOwnedNfts(): Nft[] | undefined {
    const { address: owner, isConnected, chainId } = useWallet();

    const { address: contractAddress, abi } = (nftProvider[chainId] || nftProvider[ChainId.Mumbai]).contract;
    const abiInterface = useMemo(() => new Interface(abi), [abi]);

    const [numberOfTokens] = useContractCall(isConnected && {
        abi: abiInterface,
        address: contractAddress,
        method: 'balanceOf',
        args: [owner],
    }) ?? [];

    const tokenIndices = (
        useContractCalls(Array.from({length: numberOfTokens ?? 0}, (_, i) => ({
            abi: abiInterface,
            address: contractAddress,
            method: 'tokenOfOwnerByIndex',
            args: [owner, i],
        })))
    ).filter((value) => value !== undefined).map((result) => result[0]);

    const properties = useContractCalls(tokenIndices.map((tokenIndex) => ({
        abi: abiInterface,
        address: contractAddress,
        method: 'properties',
        args: [tokenIndex],
    }))).filter((value) => value !== undefined);

    const jsonUrls = properties.map((arr) => withIpfsGateway(arr[1]));

    const [result, setResult] = useState<Nft[] | undefined>(undefined);

    useEffect(() => {
        async function fetch() {
            try {
                const results = await Promise.all(jsonUrls.map((url) => axios.get<NftData>(url)));
                setResult(results.map((result) => ({
                    name: result.data.name,
                    description: result.data.description,
                    image: withIpfsGateway(result.data.image),
                })));
            } catch (err) {
                // TODO: Handle error
            }
        }
        fetch();
    }, [jsonUrls.join(',')]);

    return result;
}