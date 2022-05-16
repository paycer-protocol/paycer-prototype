import {useEffect, useMemo, useState} from 'react'
import { BigNumber, FixedFormat } from '@ethersproject/bignumber'
import { ChainId } from '@usedapp/core'
import { formatUnits, parseUnits } from '@ethersproject/units'
import InvestAbi from '../deployments/Invest.json'
import ERC20Abi from '../deployments/ERC20.json'
import { Contract } from '@ethersproject/contracts'
import { useWallet } from '@context/wallet-context'
import { StrategyType } from '../types/investment'
import {useMoralisWeb3Api, useWeb3ExecuteFunction} from "react-moralis";
import Moralis from "moralis";

enum TRANSACTION_STATE {
    "NONE" = 0,
    "APPROVE" = 1,
    "TRANSACTION" = 2
}

interface UseVestingProps {
    deposit: (amount: Number) => Promise<void>
    withdraw: (amount: Number) => Promise<void>
    resetStatus: () => void
    withdrawAbleAmount: number
    withdrawIsSuccess: boolean
    depositIsSuccess: boolean
    showFormApproveModal: boolean
    setShowFormApproveModal: React.Dispatch<React.SetStateAction<boolean>>
    transactionState: TRANSACTION_STATE
    contractCallError: Error
    isLoading?: boolean
    isWithdrawAble: boolean
}

export default function useInvest(strategy: StrategyType):UseVestingProps {
    const { currentChainId, walletAddress, currentChainIdBinary } = useWallet()
    const strategyAddress = strategy.chainAddresses[currentChainId] || strategy.chainAddresses[ChainId.Polygon]
    const tokenContract = new Contract(strategy.input.chainAddresses[currentChainId], ERC20Abi)
    const Web3Api = useMoralisWeb3Api()

    const [showFormApproveModal, setShowFormApproveModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [balanceOf, setBalanceOf] = useState<number>(0)
    const [pricePerShare, setPricePerShare] = useState<number>(0)
    const [withdrawAbleAmount, setWithdrawAbleAmount] = useState<number>(0)
    const [tokenAllowance, setTokenAllowance] = useState<number>(0)

    const [withdrawIsSuccess, setWithdrawIsSuccess] = useState<boolean>(false)
    const [depositIsSuccess, setDepositIsSuccess] = useState<boolean>(false)
    const [contractCallError, setContractCallError] = useState<Error | null>(null)
    const [transactionState, setTransactionState] = useState<TRANSACTION_STATE>(0)


    const { data: withdrawData, error: withdrawError, fetch: withdraw, isFetching: withdrawIsFetching, isLoading: withdrawIsLoading } = useWeb3ExecuteFunction()
    const { data: depositData, error: depositError, fetch: deposit, isFetching: depositIsFetching, isLoading: depositIsLoading } = useWeb3ExecuteFunction()
    const { data: approveData, error: approveError, fetch: approve, isFetching: approveIsFetching, isLoading: approveIsLoading } = useWeb3ExecuteFunction()


    const investRequestParams = useMemo(() => {
        return (
            {
                contractAddress: strategyAddress,
                abi: InvestAbi,
            }
        )
    }, [])


    const fetchBalanceOf = () => {
        if (walletAddress) {
            const fetch = async () => {
                const options = {
                    contractAddress: strategyAddress,
                    functionName: 'balanceOf',
                    abi: InvestAbi,
                    params: {account: walletAddress},
                }
                try {
                    // @ts-ignore
                    const response: BigNumber = await Moralis.executeFunction(options)
                    if (response && BigNumber.isBigNumber(response)) {
                        setBalanceOf(Number(formatUnits(response, 18)))

                    }
                } catch (e) {
                    console.log('balanceOf', e)
                }
            }
            fetch()
        }
    }

    const fetchPricePerShare = () => {
        if (walletAddress) {
            const fetch = async () => {
                const options = {
                    contractAddress: strategyAddress,
                    functionName: 'pricePerShare',
                    abi: InvestAbi,
                }
                try {
                    // @ts-ignore
                    const response: BigNumber = await Moralis.executeFunction(options)
                    if (response && BigNumber.isBigNumber(response)) {
                        setPricePerShare(Number(formatUnits(response, strategy.decimals)))

                    }
                } catch (e) {
                    console.log('pricePerShare', e)
                }
            }
            fetch()
        }
    }

    const fetchAllowance = () => {
        if (walletAddress) {
            const fetch = async () => {
                const options = {
                    chain: currentChainIdBinary,
                    owner_address: walletAddress,
                    spender_address: strategyAddress,
                    address: tokenContract.address,
                }

                console.log(options)

                try {
                    // @ts-ignore
                    const response = await Web3Api.token.getTokenAllowance(options)
                    const { allowance } = response
                    if (allowance) {
                        setTokenAllowance(Math.round(Number(formatUnits(allowance, strategy.decimals))))
                    }
                } catch(e) {
                    console.log('allowance', e)
                }
            }
            fetch()
        }
    }

    useEffect(() => {
        fetchAllowance()
        fetchBalanceOf()
        fetchPricePerShare()
    }, [withdrawIsSuccess, depositIsSuccess])

    useEffect(() => {
        if (walletAddress && balanceOf && pricePerShare) {
            setWithdrawAbleAmount(pricePerShare * balanceOf)
        }
    }, [balanceOf, pricePerShare, withdrawIsSuccess])

    const handleApprove = async (amount):Promise<unknown> => {
        const approveParams = {
            functionName: 'approve',
            contractAddress: tokenContract.address,
            abi: ERC20Abi,
            params: { spender: strategyAddress, amount: parseUnits(String((amount * 2).toFixed(strategy.decimals)), strategy.decimals) }
        }

        return await approve({
            params: approveParams
        })
    }

    const handleDeposit = async (amount: number) => {
        setIsLoading(true)

        const approveTx = await handleApprove(amount)

        if (amount > tokenAllowance) {
            try {
                // Wait for the transaction to be mined
                setTransactionState(1)
                await approveTx.wait()
                // The transactions was mined without issue
            } catch (error) {
                if (error.code === 'TRANSACTION_REPLACED') {
                    if (error.cancelled) {
                        // The transaction was replaced  :'(
                        setIsLoading(false)
                        setContractCallError(new Error('Approve has been aboted'))
                        // ELSE USER PRESSED SPEED UP IN META MASK FOR EXMAPLE
                    } else {
                        //console.log('approve speeded up')
                    }
                    setTransactionState(0)
                }  else {
                    setIsLoading(false)
                    setContractCallError(new Error('Deposit Error. Please try again'))
                }
            }
        }

        const depositParams = {
            functionName: 'deposit',
            params: { amount:  parseUnits(String(amount.toFixed(strategy.decimals)), strategy.decimals) }
        }

        const params = { ...investRequestParams, ...depositParams}
        const depositTx = await deposit({
            params
        })

        try {
            setTransactionState(2)
            await depositTx.wait()
            setDepositIsSuccess(true)
            setTransactionState(0)
        } catch (error) {
            if (error.code === 'TRANSACTION_REPLACED') {
                if (error.cancelled) {
                    // The transaction was replaced  :'(
                    setIsLoading(false)
                    setContractCallError(new Error('Deposit has been aborted.'))
                } else {
                    //  was speeded up
                    setDepositIsSuccess(true)
                    setIsLoading(false)
                }
            }
        }
    }

    const handleWithdraw = async (amount: number) => {
        setIsLoading(true)
        try {
            const realAmount = amount / pricePerShare

            const withdrawParams = {
                functionName: 'withdraw',
                params: { _shares: parseUnits(String(realAmount.toFixed(18)), 18) }
            }

            const params = { ...investRequestParams, ...withdrawParams}

            const withdrawTx = await withdraw({
                params
            })

            try {
                console.log('try..')
                setTransactionState(2)
                await withdrawTx.wait()
                setWithdrawIsSuccess(true)
                setTransactionState(0)
            } catch (error) {
                console.log(error)
                if (error.code === 'TRANSACTION_REPLACED') {
                    if (error.cancelled) {
                        // The transaction was replaced  :'(
                        setIsLoading(false)
                        setContractCallError(new Error('Withdraw has been aborted.'))
                    } else {
                        //  was speeded up
                        setWithdrawIsSuccess(true)
                        setIsLoading(false)
                    }
                }
            }
        } catch(error) {
            console.log(error)
        }
    }

    const resetStatus = () => {
        setWithdrawIsSuccess(false)
        setDepositIsSuccess(false)
        setContractCallError(null)
        setIsLoading(false)
        setTransactionState(0)
    }

    console.log(withdrawAbleAmount)

    return {
        deposit: handleDeposit,
        withdraw: handleWithdraw,
        withdrawAbleAmount,
        resetStatus,
        isWithdrawAble: balanceOf > strategy.minWithdraw,
        // @ts-ignore
        /* TODO ADD TOTAL AMOUNT CLAIMED */
        // @ts-ignore
        withdrawIsSuccess,
        depositIsSuccess,
        contractCallError,
        transactionState,
        showFormApproveModal,
        setShowFormApproveModal,
        isLoading,
    }
}
