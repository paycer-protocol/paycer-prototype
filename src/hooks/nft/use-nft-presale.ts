import useWallet from '@hooks/use-wallet';
import nftProvider from '@providers/nft';
import { ChainId, useContractFunction } from '@usedapp/core';
import { Contract } from '@ethersproject/contracts'
import { useMemo } from "react";

export default function useNftPresale() {
    // TODO: Merkle proof

    const { chainId } = useWallet();

    const { address: contractAddress, abi } = (nftProvider[chainId] || nftProvider[ChainId.Mumbai]).presale;
    const contract = useMemo(() => new Contract(contractAddress, abi), [contractAddress, abi]);

    // @ts-ignore
    const { send: sendBuy, state: mintTx, resetState } = useContractFunction(contract, 'buy');
    console.log(mintTx.errorMessage);

    return {
        status: (<const>{
            'None': 'idle',
            'PendingSignature': 'loading',
            'Mining': 'loading',
            'Success': 'success',
            'Fail': 'error',
            'Exception': 'error',
        })[mintTx.status],
        async buy(amount: number, alloc: number, merkleProof: string[]) {
            await sendBuy(amount, alloc, merkleProof);
        },
        resetState,
    }
}