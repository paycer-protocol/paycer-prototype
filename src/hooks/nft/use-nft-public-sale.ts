import useWallet from '@hooks/use-wallet';
import nftProvider from '@providers/nft';
import { ChainId, useContractFunction } from '@usedapp/core';
import { Contract } from '@ethersproject/contracts'
import { useMemo } from "react";

export default function useNftPublicSale() {
    const { chainId } = useWallet();

    const { address: contractAddress, abi } = (nftProvider[chainId] || nftProvider[ChainId.Mumbai]).publicSale;
    const contract = useMemo(() => new Contract(contractAddress, abi), [contractAddress, abi]);

    // @ts-ignore
    const { send: sendBuy, state: mintTx, resetState } = useContractFunction(contract, 'buy');

    return {
        status: (<const>{
            'None': 'idle',
            'PendingSignature': 'loading',
            'Mining': 'loading',
            'Success': 'success',
            'Fail': 'error',
            'Exception': 'error',
        })[mintTx.status],
        async buy(amount: number) {
            await sendBuy(amount);
        },
        resetState,
    }
}