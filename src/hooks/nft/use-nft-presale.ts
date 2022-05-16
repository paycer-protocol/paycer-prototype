import useWallet from '@hooks/use-wallet';
import nftProvider from '@providers/nft';
import { ChainId, ERC20, useContractCall, useContractFunction, useTokenAllowance } from '@usedapp/core';
import { Contract } from '@ethersproject/contracts'
import { useMemo } from "react";
import { BigNumber } from '@ethersproject/bignumber'
import { Interface } from "@ethersproject/abi";

export default function useNftPresale() {
    const { chainId, address: walletAddress } = useWallet();

    const { address: contractAddress, abi } = (nftProvider[chainId] || nftProvider[ChainId.Polygon]).presale;
    const contract = useMemo(() => new Contract(contractAddress, abi), [contractAddress, abi]);
    const abiInterface = useMemo(() => new Interface(abi), [abi]);

    const fundTokenAddress = (useContractCall({
        abi: abiInterface,
        address: contractAddress,
        method: 'fundToken',
        args: [],
    }) ?? [])[0];
    const price = (useContractCall({
        abi: abiInterface,
        address: contractAddress,
        method: 'price',
        args: [],
    }) ?? [])[0];

    let allowance = useTokenAllowance(fundTokenAddress, walletAddress, contractAddress);

    const fundTokenContract = useMemo(() => fundTokenAddress && new Contract(fundTokenAddress, ERC20.abi), [fundTokenAddress]);

    // @ts-ignore
    const { send: sendApprove, state: approveTx, resetState: resetApproveState } = useContractFunction(fundTokenContract, 'approve');

    // @ts-ignore
    const { send: sendBuy, state: buyTx, resetState: resetBuyState } = useContractFunction(contract, 'buy');

    const tx = [approveTx.status, buyTx.status];

    let status = 'idle';
    if (tx.includes('Success')) status = 'success';
    if (tx.includes('PendingSignature') || tx.includes('Mining')) status = 'loading';
    if (tx.includes('Fail') || tx.includes('Exception')) status = 'error';

    return {
        status,
        async buy(amount: number, alloc: number, merkleProof: string[]) {
            if (!BigNumber.isBigNumber(price)) return;
            const total = price.mul(amount);
            if (allowance.sub(total).isNegative()) {
                await sendApprove(contractAddress, total.sub(allowance));
            }
            await sendBuy(amount, alloc, merkleProof);
        },
        resetState: () => {
            resetApproveState()
            resetBuyState()
        },
    }
}