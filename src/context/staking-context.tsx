import React, {createContext, useContext, useEffect, useMemo, useState} from 'react'
import Moralis from 'moralis'
import { useWeb3ExecuteFunction, useMoralisWeb3Api, useMoralisWeb3ApiCall } from 'react-moralis'
import { BigNumber } from '@ethersproject/bignumber'
import { formatUnits, parseUnits } from '@ethersproject/units'
import StakingContractProvider from '@providers/staking'
import ChainId from '@providers/chain-id'
import { formatLastRewardtime } from '../helpers/staking-helper'
import { useDapp } from '@context/dapp-context'
import PaycerTokenContractProvider from "@providers/paycer-token";

enum TRANSACTION_STATE {
    "NONE" = 0,
    "APPROVE" = 1,
    "TRANSACTION" = 2
}

interface UseStakingProps {
    deposit: (amount: Number) => Promise<void>
    withdraw: (amount: Number) => Promise<void>
    claim: () => Promise<void>
    pendingReward: number
    stakedBalance: number
    rewardRate: number
    totalAmountClaimed: number
    lastRewardTime: string
    isLoading: boolean
    withdrawIsSuccess: boolean
    depositIsSuccess: boolean
    claimIsSuccess: boolean
    transactionState: TRANSACTION_STATE
    contractCallError: Error
    resetStatus: () => void
}

const contextDefaultValues: UseStakingProps = {
    deposit: null,
    withdraw: null,
    claim: null,
    pendingReward: 0,
    stakedBalance: 0,
    rewardRate: 0,
    totalAmountClaimed: 0,
    lastRewardTime: '',
    isLoading: false,
    withdrawIsSuccess: false,
    depositIsSuccess: false,
    claimIsSuccess: false,
    transactionState: 0,
    contractCallError: null,
    resetStatus: null
}

type UserInfoRequest = {
    accRewardPerShare: BigNumber
    amount: BigNumber
    lastDepositedAt: BigNumber
    lastRewardTime: BigNumber
    rewardDebt: BigNumber
}

const StakingContext = createContext<UseStakingProps>(
    contextDefaultValues
)

export const useStaking = () => useContext(StakingContext)

const StakingContextProvider = ({ children }) => {

    const { walletAddress, currentNetworkId, currentChainId, isInitialized, currentNetwork, fetchERC20Balances } = useDapp()
    const Web3Api = useMoralisWeb3Api()
    const stakingAddress = StakingContractProvider[currentNetworkId] || StakingContractProvider[ChainId.Polygon]
    const paycerTokenConfig = PaycerTokenContractProvider[currentNetworkId] || PaycerTokenContractProvider[ChainId.Polygon]
    const pcrContract = paycerTokenConfig.contract

    const [withdrawIsSuccess, setWithdrawIsSuccess] = useState<boolean>(false)
    const [depositIsSuccess, setDepositIsSuccess] = useState<boolean>(false)
    const [claimIsSuccess, setClaimIsSuccess] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<UserInfoRequest | null>(null)
    const [rewardRate, setRewardRate] = useState<number>(12)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [transactionState, setTransactionState] = useState<TRANSACTION_STATE>(0)
    const [tokenAllowance, setTokenAllowance] = useState<number>(0)
    const [contractCallError, setContractCallError] = useState<Error | null>(null)
    const [pendingReward, setPendingReward] = useState<number>(0)

    const { data: withdrawData, error: withdrawError, fetch: withdraw, isFetching: withdrawIsFetching, isLoading: withdrawIsLoading } = useWeb3ExecuteFunction()
    const { data: depositData, error: depositError, fetch: deposit, isFetching: depositIsFetching, isLoading: depositIsLoading } = useWeb3ExecuteFunction()
    const { data: claimData, error: claimError, fetch: claim, isFetching: claimIsFetching, isLoading: claimIsLoading } = useWeb3ExecuteFunction()
    const { data: approveData, error: approveError, fetch: approve, isFetching: approveIsFetching, isLoading: approveIsLoading } = useWeb3ExecuteFunction()

    const stakingRequestParams = useMemo(() => {
        return (
            {
                contractAddress: stakingAddress,
                abi: StakingContractProvider.abi,
            }
        )
    }, [currentNetworkId, walletAddress, isInitialized])

    const handleApprove = async (amount) => {

        try {
            const approveParams = {
                functionName: 'approve',
                contractAddress: pcrContract.address,
                abi: pcrContract.abi,
                params: { spender: stakingAddress, amount: parseUnits(String(amount * 2), 18) }
            }

            const approveTx = await approve({
                params: approveParams
            })

            setTransactionState(1)

            if (approveTx) {
                //@ts-ignore
                await approveTx.wait()
            }

        } catch (error) {
            // The transactions was mined without issue
            if (error.code && error.code === 'TRANSACTION_REPLACED') {
                if (error.cancelled) {
                    setContractCallError(new Error('Approve has been canceled.'))
                } else {
                    //console.log('approve speeded up')
                }
                setTransactionState(0)
            }  else {
                setContractCallError(new Error('Approve failed. Please try again.'))
            }
            setIsLoading(false)
        }
    }

    const handleWithdraw = async (amount: number) => {
        setIsLoading(true)

        if (amount > tokenAllowance) {
            await handleApprove(amount)
        }

        const withdrawParams = {
            functionName: 'withdraw',
            params: { to: walletAddress, amount:  parseUnits(String(amount), 18) }
        }

        const params = { ...stakingRequestParams, ...withdrawParams}

        try {

            const withdrawTx = await withdraw({
                params
            })

            if (withdrawTx) {
                setTransactionState(2)
                //@ts-ignore
                await withdrawTx.wait()
                setWithdrawIsSuccess(true)
                setTransactionState(0)
                fetchERC20Balances()
            }

        } catch (error) {
            if (error.code && error.code === 'TRANSACTION_REPLACED') {
                if (error.cancelled) {
                    setContractCallError(new Error('Withdraw has been canceled.'))
                } else {
                    //  was speeded up
                    setWithdrawIsSuccess(true)
                }
            } else {
                setContractCallError(new Error('Withdraw failed. Please try again.'))
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeposit = async (amount: number) => {
        setIsLoading(true)

        if (amount > tokenAllowance) {
            await handleApprove(amount)
        }

        const depositParams = {
            functionName: 'deposit',
            params: { to: walletAddress, amount:  parseUnits(String(amount), 18) }
        }

        const params = { ...stakingRequestParams, ...depositParams}

        try {

            const depositTx = await deposit({
                params
            })

            if (depositTx) {
                setTransactionState(2)
                //@ts-ignore
                await depositTx.wait()
                setDepositIsSuccess(true)
                setTransactionState(0)
                fetchERC20Balances()
            }

        } catch (error) {
            if (error.code && error.code === 'TRANSACTION_REPLACED') {
                if (error.cancelled) {
                    setContractCallError(new Error('Deposit has been canceled.'))
                } else {
                    //  was speeded up
                    setDepositIsSuccess(true)
                }
            } else {
                setContractCallError(new Error('Deposit failed. Please try again.'))
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleClaim = async () => {

        setIsLoading(true)

        const claimParams = {
            functionName: 'claim',
            params: { to: walletAddress }
        }
        const params = { ...stakingRequestParams, ...claimParams}

        const claimTx = await claim({
            params
        })

        try {
            // @ts-ignore
            await claimTx.wait()
            setIsLoading(false)
            setClaimIsSuccess(true)
            setPendingReward(0)
            fetchERC20Balances()
        } catch (error) {
            if (error.code === 'TRANSACTION_REPLACED') {
                if (error.cancelled) {
                    // The transaction was replaced  :'(
                    setContractCallError(new Error('Claim has been aborted.'))
                } else {
                    //  was speeded up
                    setClaimIsSuccess(true)

                }
            }
        } finally {
            setIsLoading(false)
        }
    }

    const fetchAllowance = () => {
        if (walletAddress && isInitialized) {
            const fetch = async () => {
                const options = {
                    chain: currentChainId,
                    owner_address: walletAddress,
                    spender_address: stakingAddress,
                    address: pcrContract.address,
                }
                try {
                    // @ts-ignore
                    const response = await Web3Api.token.getTokenAllowance(options)
                    const { allowance } = response
                    if (allowance) {
                        setTokenAllowance(Math.round(Number(formatUnits(allowance, 18))))
                    }
                } catch(e) {
                    console.log('allowance', e)
                }
            }
            fetch()
        } else {
            setTokenAllowance(0)
        }
    }

    const fetchUserInfo = () => {
        if (isInitialized && walletAddress) {
            const fetch = async () => {
                const options = {
                    chain: currentNetwork.chainName.toLowerCase(),
                    address: stakingAddress,
                    function_name: 'userInfo',
                    abi: StakingContractProvider.abi,
                    params: {beneficiary: walletAddress},
                }
                try {
                    // @ts-ignore
                    const response: UserInfoRequest = await Moralis.Web3API.native.runContractFunction(options)
                    if (response) {
                        setUserInfo(response)
                    }
                } catch (e) {
                    console.log('userInfo', e)
                }
            }
            fetch()
        } else {
            setUserInfo(null)
        }
    }

    const fetchRewardRate = () => {
        if (isInitialized && walletAddress) {
            const fetch = async () => {
                const options = {
                    chain: currentNetwork.chainName.toLowerCase(),
                    address: stakingAddress,
                    function_name: 'rewardAPY',
                    abi: StakingContractProvider.abi,
                    params: {_user: walletAddress},
                }
                try {
                    // @ts-ignore
                    const response = await Moralis.Web3API.native.runContractFunction(options)
                    if (response) {
                        setRewardRate(Number(response) / 100)
                    }
                } catch (e) {
                    console.log('rewardAPY', e)
                }
            }
            fetch()
        } else {
            setRewardRate(0)
        }
    }

    const fetchPendingRewards = () => {
        if (isInitialized && walletAddress) {
            const fetch = async () => {
                const options = {
                    chain: currentNetwork.chainName.toLowerCase(),
                    address: stakingAddress,
                    function_name: 'pendingReward',
                    abi: StakingContractProvider.abi,
                    params: {_user: walletAddress},
                }

                try {
                    // @ts-ignore
                    const response = await Moralis.Web3API.native.runContractFunction(options)
                    if (response) {
                        setPendingReward(Number(formatUnits(response, 18)))
                    }
                } catch (e) {
                    console.log('pendingReward', e)
                }
            }
            fetch()
        } else {
            setPendingReward(0)
        }
    }

    useEffect(() => {
        fetchUserInfo()
    }, [walletAddress, withdrawIsSuccess, depositIsSuccess, currentNetworkId])

    useEffect(() => {
        fetchRewardRate()
        fetchPendingRewards()
        fetchAllowance()
    }, [walletAddress, currentNetworkId])

    // refresh pending rewards UI
    useEffect(() => {
        if (walletAddress && isInitialized) {
            const interval = setInterval(() => {
                fetchPendingRewards()
            }, 20000)
            return () => clearInterval(interval)
        }
    }, [walletAddress, currentNetworkId])

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

    useEffect(() => {
        if (claimError) {
            setContractCallError(claimError)
        }
    }, [claimError])

    useEffect(() => {
        if (approveError) {
            setContractCallError(approveError)
        }
    }, [approveError])

    const resetStatus = () => {
        setClaimIsSuccess(false)
        setWithdrawIsSuccess(false)
        setDepositIsSuccess(false)
        setContractCallError(null)
        setIsLoading(false)
        setTransactionState(0)
    }

    return (
        <StakingContext.Provider
            value={{
                deposit: handleDeposit,
                withdraw: handleWithdraw,
                claim: handleClaim,
                pendingReward,
                // @ts-ignore
                stakedBalance: Number(formatUnits(userInfo?.amount || 0)),
                // @ts-ignore
                /* TODO ADD TOTAL AMOUNT CLAIMED */
                totalAmountClaimed: 0,
                // @ts-ignore
                lastRewardTime: formatLastRewardtime(userInfo?.lastRewardTime),
                //rewardDebt: BigNumber.isBigNumber(userInfo?.rewardDebt) ? userInfo?.rewardDebt.toNumber() : 0,
                rewardRate,
                withdrawIsSuccess,
                depositIsSuccess,
                claimIsSuccess,
                contractCallError,
                isLoading,
                resetStatus,
                transactionState
            }}
        >
            {children}
        </StakingContext.Provider>
    )
}


export default StakingContextProvider