import {useEffect, useMemo, useState} from 'react'
import Moralis from 'moralis'
import { useWeb3ExecuteFunction, useMoralisWeb3Api, useMoralisWeb3ApiCall } from 'react-moralis'
import { BigNumber } from '@ethersproject/bignumber'
import { formatUnits, parseUnits } from '@ethersproject/units'
import StakingContractProvider from '@providers/staking'
import ChainId from '@providers/chain-id'
import { formatLastRewardtime } from '../helpers/staking-helper'
import { useWallet } from '@context/wallet-context'
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
    showFormApproveModal: boolean
    isLoading: boolean
    setShowFormApproveModal: React.Dispatch<React.SetStateAction<boolean>>
    withdrawIsSuccess: boolean
    depositIsSuccess: boolean
    claimIsSuccess: boolean
    transactionState: TRANSACTION_STATE
    contractCallError: Error
    resetStatus: () => void
}

type UserInfoRequest = {
    accRewardPerShare: BigNumber
    amount: BigNumber
    lastDepositedAt: BigNumber
    lastRewardTime: BigNumber
    rewardDebt: BigNumber
}

export default function useStaking():UseStakingProps {
    const { walletAddress, currentChainId, currentChainIdBinary, fetchPcrBalance } = useWallet()
    const Web3Api = useMoralisWeb3Api()
    const stakingAddress = StakingContractProvider[currentChainId] || StakingContractProvider[ChainId.Polygon]
    const paycerTokenConfig = PaycerTokenContractProvider[currentChainId] || PaycerTokenContractProvider[ChainId.Polygon]
    const pcrContract = paycerTokenConfig.contract

    const [showFormApproveModal, setShowFormApproveModal] = useState(false)

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
    }, [])

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

    const handleWithdraw = async (amount: number) => {
        setIsLoading(true)

        if (amount > tokenAllowance) {
            await handleApprove(amount)
        }

        try {
            const withdrawParams = {
                functionName: 'withdraw',
                params: { to: walletAddress, amount:  parseUnits(String(amount), 18) }
            }
            const params = { ...stakingRequestParams, ...withdrawParams}
            const withdrawTx = await withdraw({
                params
            })

            try {
                // Wait for the transaction to be mined
                setTransactionState(2)
                await withdrawTx.wait()
                setWithdrawIsSuccess(true)
                setTransactionState(0)
                fetchPcrBalance()
                // The transactions was mined without issue
            } catch (error) {
                if (error.code === 'TRANSACTION_REPLACED') {
                    if (error.cancelled) {
                        // The transaction was replaced  :'(
                        setIsLoading(false)
                        setContractCallError(new Error('Withdraw has been canceled.'))
                        // ELSE USER PRESSED SPEED UP IN META MASK FOR EXMAPLE
                    } else {
                        //console.log('withdraw speeded up')
                    }
                    setTransactionState(0)
                } else {
                    setIsLoading(false)
                    setWithdrawIsSuccess(true)
                }
            }
        } catch (error) {
            setContractCallError(new Error('Withdraw failed. Please try again.'))
            setIsLoading(false)
        }
    }

    const handleDeposit = async (amount: number) => {
        setIsLoading(true)

        if (amount > tokenAllowance) {
            await handleApprove(amount)
        }

        try {
            const depositParams = {
                functionName: 'deposit',
                params: { to: walletAddress, amount:  parseUnits(String(amount), 18) }
            }

            const params = { ...stakingRequestParams, ...depositParams}
            const depositTx = await deposit({
                params
            })

            if (depositTx) {
                try {
                    setTransactionState(2)
                    await depositTx.wait()
                    setDepositIsSuccess(true)
                    setTransactionState(0)
                    fetchPcrBalance()
                } catch (error) {
                    if (error.code === 'TRANSACTION_REPLACED') {
                        if (error.cancelled) {
                            // The transaction was replaced  :'(
                            setIsLoading(false)
                            setContractCallError(new Error('Deposit has been canceled.'))
                        } else {
                            //  was speeded up
                            setDepositIsSuccess(true)
                            setIsLoading(false)
                        }
                    }
                }
            }
        } catch(error) {
            setContractCallError(new Error('Deposit failed. Please try again.'))
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
            fetchPcrBalance()
        } catch (error) {
            if (error.code === 'TRANSACTION_REPLACED') {
                if (error.cancelled) {
                    // The transaction was replaced  :'(
                    setIsLoading(false)
                    setContractCallError(new Error('Claim has been aborted.'))
                } else {
                    //  was speeded up
                    setClaimIsSuccess(true)
                    setIsLoading(false)
                }
            }
        }
    }

    const fetchAllowance = () => {
        if (walletAddress) {
            const fetch = async () => {
                const options = {
                    chain: currentChainIdBinary,
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
        }
    }

    const fetchUserInfo = () => {
        if (walletAddress) {
            const fetch = async () => {
                const options = {
                    contractAddress: stakingAddress,
                    functionName: 'userInfo',
                    abi: StakingContractProvider.abi,
                    params: {beneficiary: walletAddress},
                }
                try {
                    // @ts-ignore
                    const response: UserInfoRequest = await Moralis.executeFunction(options)
                    if (response) {
                        setUserInfo(response)
                    }
                } catch (e) {
                    console.log('userInfo', e)
                }
            }
            fetch()
        }
    }

    const fetchRewardRate = () => {
        if (walletAddress) {
            const fetch = async () => {
                const options = {
                    contractAddress: stakingAddress,
                    functionName: 'rewardAPY',
                    abi: StakingContractProvider.abi,
                    params: {_user: walletAddress},
                }
                try {
                    // @ts-ignore
                    const response: BigNumber = await Moralis.executeFunction(options)
                    if (response && BigNumber.isBigNumber(response)) {
                        setRewardRate(response.toNumber() / 100)
                    }
                } catch (e) {
                    console.log('rewardAPY', e)
                }
            }
            fetch()
        }
    }

    const fetchPendingRewards = () => {
        if (walletAddress) {
            const fetch = async () => {
                const options = {
                    contractAddress: stakingAddress,
                    functionName: 'pendingReward',
                    abi: StakingContractProvider.abi,
                    params: {_user: walletAddress},
                }
                try {
                    // @ts-ignore
                    const response = await Moralis.executeFunction(options)
                    if (response && BigNumber.isBigNumber(response)) {
                        setPendingReward(Number(formatUnits(response, 18)))
                    }
                } catch (e) {
                    console.log('pendingReward', e)
                }
            }
            fetch()
        }
    }

    useEffect(() => {
        fetchUserInfo()
    }, [walletAddress, withdrawIsSuccess, depositIsSuccess])

    useEffect(() => {
        fetchRewardRate()
        fetchPendingRewards()
        fetchAllowance()
    }, [walletAddress])

    // refresh pending rewards UI
    useEffect(() => {
        const interval = setInterval(() => {
            fetchPendingRewards()
        }, 20000)
        return () => clearInterval(interval)
    }, [])

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

    return {
        deposit: handleDeposit,
        withdraw: handleWithdraw,
        claim: handleClaim,
        pendingReward,
        // @ts-ignore
        stakedBalance: BigNumber.isBigNumber(userInfo?.amount) ? Number(formatUnits(userInfo?.amount, 18)) : 0,
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
        showFormApproveModal,
        setShowFormApproveModal,
        isLoading,
        resetStatus,
        transactionState
    }
}
