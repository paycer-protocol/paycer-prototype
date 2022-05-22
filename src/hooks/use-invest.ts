import {useEffect, useMemo, useState} from 'react'
import { BigNumber, FixedFormat } from '@ethersproject/bignumber'
import { ChainId } from '@usedapp/core'
import { formatUnits, parseUnits } from '@ethersproject/units'
import InvestAbi from '../deployments/Invest.json'
import ERC20Abi from '../deployments/ERC20.json'
import { Contract } from '@ethersproject/contracts'
import { useDapp } from '@context/dapp-context'
import { StrategyType } from '../types/investment'
import useInvestIsWithdrawable from '@hooks/use-invest-is-withdrawable'
import {useMoralisWeb3Api, useWeb3ExecuteFunction} from "react-moralis";
import Moralis from "moralis";

enum TRANSACTION_STATE {
    "NONE" = 0,
    "APPROVE" = 1,
    "TRANSACTION" = 2
}

interface UseInvestProps {
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
}

export default function useInvest(strategy: StrategyType):UseInvestProps {
    const { currentChainId, walletAddress, currentChainIdBinary, isAuthenticated } = useDapp()
    const strategyAddress = strategy.chainAddresses[currentChainId] || strategy.chainAddresses[ChainId.Polygon]
    const tokenContract = new Contract(strategy.input.chainAddresses[currentChainId], ERC20Abi)
    const Web3Api = useMoralisWeb3Api()
    const { setIsWithdrawAble } = useInvestIsWithdrawable(strategy)

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
        if (walletAddress && isAuthenticated) {
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
        if (walletAddress && isAuthenticated) {
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
        if (walletAddress && isAuthenticated) {
            const fetch = async () => {
                const options = {
                    chain: currentChainIdBinary,
                    owner_address: walletAddress,
                    spender_address: strategyAddress,
                    address: tokenContract.address,
                }

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
    }, [])

    useEffect(() => {
        if (walletAddress && balanceOf && pricePerShare) {
            setWithdrawAbleAmount(pricePerShare * balanceOf)
            setIsWithdrawAble(balanceOf > strategy.minWithdraw)
        }
    }, [balanceOf, pricePerShare])

    useEffect(() => {
        if (withdrawError) {
            setContractCallError(withdrawError)
        }
    }, [withdrawError])

    useEffect(() => {
        if (depositError) {
            setContractCallError(depositError)
        }
    }, [depositError])

    const handleApprove = async (amount) => {

        try {
            const approveParams = {
                functionName: 'approve',
                contractAddress: tokenContract.address,
                abi: ERC20Abi,
                params: { spender: strategyAddress, amount: parseUnits(String((amount * 2).toFixed(strategy.decimals)), strategy.decimals) }
            }

            const approveTx = await approve({
                params: approveParams
            })

            setTransactionState(1)

            if (approveTx) {
                try {
                    await approveTx.wait()
                    // The transactions was mined without issue
                } catch (error) {
                    if (error.code === 'TRANSACTION_REPLACED') {
                        if (error.cancelled) {
                            // The transaction was replaced  :'(
                            setIsLoading(false)
                            setContractCallError(new Error('Approve has been canceled.'))
                            // ELSE USER PRESSED SPEED UP IN META MASK FOR EXMAPLE
                        } else {
                            //console.log('approve speeded up')
                        }
                        setTransactionState(0)
                    }  else {
                        setIsLoading(false)
                        setContractCallError(new Error('Approve failed. Please try again.'))
                    }
                }
            }
        } catch(e) {
            setIsLoading(false)
            setContractCallError(new Error('Approve failed. Please try again.'))
        }
    }

    const handleDeposit = async (amount: number) => {
        setIsLoading(true)

        if (amount > tokenAllowance) {
            await handleApprove(amount)
        }

        const _amount = parseUnits(String(amount.toFixed(strategy.decimals)), strategy.decimals)

        try {
            const depositParams = {
                functionName: 'deposit',
                params: { _amount }
            }

            const params = { ...investRequestParams, ...depositParams}
            const depositTx = await deposit({
                params
            })

            if (depositTx) {
                try {
                    setTransactionState(2)
                    await depositTx.wait()
                    fetchBalanceOf()
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

        } catch (error) {
            setContractCallError(new Error('Withdraw failed. Please try again.'))
            setIsLoading(false)
        }
    }

    const handleWithdraw = async (amount: number) => {

        setIsLoading(true)

        try {
            const realAmount = amount / pricePerShare
            const _shares = parseUnits(String(realAmount.toFixed(18)), 18)

            const withdrawParams = {
                functionName: 'withdraw',
                params: { _shares }
            }

            const params = {...investRequestParams, ...withdrawParams}

            const withdrawTx = await withdraw({
                params
            })

            if (withdrawTx) {
                try {
                    setTransactionState(2)
                    await withdrawTx.wait()
                    fetchBalanceOf()
                    setWithdrawIsSuccess(true)
                    setTransactionState(0)
                } catch (error) {
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
            }

        } catch (error) {
            setContractCallError(new Error('Withdraw failed. Please try again.'))
            setIsLoading(false)
        }
    }

    const resetStatus = () => {
        setWithdrawIsSuccess(false)
        setDepositIsSuccess(false)
        setContractCallError(null)
        setIsLoading(false)
        setTransactionState(0)
    }

    return {
        deposit: handleDeposit,
        withdraw: handleWithdraw,
        withdrawAbleAmount,
        resetStatus,
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
