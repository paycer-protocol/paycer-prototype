import useWallet from "@hooks/use-wallet";
import nftProvider from '@providers/nft';
import { ChainId, useContractFunction } from "@usedapp/core";
import { Contract } from "ethers";
import { useMemo, useState } from "react";

export interface UseMintProps {
    status: 'idle' | 'loading' | 'success' | 'error';
    mint: () => Promise<void>;
    resetState: () => void;
}

export default function useMint(): UseMintProps {
    const { address: owner, chainId } = useWallet();

    const { address: contractAddress, abi } = (nftProvider[chainId] || nftProvider[ChainId.Mumbai]).contract;
    const contract = useMemo(() => new Contract(contractAddress, abi), [abi]);
    
    const { send: sendMint, state: mintTx, resetState } = useContractFunction(contract, 'mintByUsers');

    return {
        status: (<const>{
            'None': 'idle',
            'PendingSignature': 'loading',
            'Mining': 'loading',
            'Success': 'success',
            'Fail': 'error',
            'Exception': 'error',
        })[mintTx.status],
        async mint() {
            await sendMint(owner);
        },
        resetState,
    }
}