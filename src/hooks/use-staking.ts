import {useEffect, useMemo, useState} from 'react'
import { useContractCall, useContractFunction, useTokenAllowance } from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import ChainId from '@providers/chain-id'
import { formatUnits, parseUnits } from '@ethersproject/units'
import StakingContractProvider from '@providers/staking'
import PaycerTokenContractProvider from '@providers/paycer-token'
import useWallet from '@hooks/use-wallet'
import { useWeb3ExecuteFunction } from 'react-moralis'
import { formatLastRewardtime } from '../helpers/staking-helper'
import Moralis from 'moralis'

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
    setShowFormApproveModal: React.Dispatch<React.SetStateAction<boolean>>

    withdrawIsLoading: boolean
    withdrawIsFetching: boolean
    withdrawError: Error
    withdrawIsSuccess: boolean

    depositIsLoading: boolean
    depositIsFetching: boolean
    depositError: Error
    depositIsSuccess: boolean

    claimIsLoading: boolean
    claimIsFetching: boolean
    claimError: Error
    claimIsSuccess: boolean

    approveIsLoading: boolean
    approveIsFetching: boolean
    approveError: Error
}

type UserInfoRequest = {
    accRewardPerShare: BigNumber
    amount: BigNumber
    lastDepositedAt: BigNumber
    lastRewardTime: BigNumber
    rewardDebt: BigNumber
}

export default function useStaking():UseStakingProps {
    const wallet = useWallet()
    const { chainId } = wallet
    const stakingAddress = StakingContractProvider[chainId] || StakingContractProvider[ChainId.Polygon]

    const [showFormApproveModal, setShowFormApproveModal] = useState(false)

    const [withdrawIsSuccess, setWithdrawIsSuccess] = useState<boolean>(false)
    const [depositIsSuccess, setDepositIsSuccess] = useState<boolean>(false)
    const [claimIsSuccess, setClaimIsSuccess] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<UserInfoRequest | null>(null)
    const [rewardRate, setRewardRate] = useState<number>(12)
    const [pendingReward, setPendingReward] = useState<number>(0)

    const paycerTokenConfig = PaycerTokenContractProvider[chainId] || PaycerTokenContractProvider[ChainId.Polygon]
    const paycerToken = paycerTokenConfig.contract
    let allowance = useTokenAllowance(paycerToken.address, wallet.address, stakingAddress)
    const formattedAllowance = BigNumber.isBigNumber(allowance) ? Number(formatUnits(allowance, 18)) : 0

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

    const paycerTokenApproveRequestParams = useMemo(() => {
        return (
            {
                functionName: 'approve',
                contractAddress: paycerToken.address,
                abi: paycerToken.abi,
            }
        )
    }, [])

    const sendWithdraw = async (amount: number) => {
        const withdrawParams = {
            functionName: 'withdraw',
            params: { user: wallet.address, amount:  parseUnits(String(amount), 18) }
        }
        const params = { ...stakingRequestParams, ...withdrawParams};
        try {
            await withdraw({
                params,
                onSuccess: results => {
                    setWithdrawIsSuccess(true)
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    const sendDeposit = async (amount: number) => {
        const withdrawParams = {
            functionName: 'deposit',
            params: { user: wallet.address, amount:  parseUnits(String(amount), 18) }
        }
        const params = { ...stakingRequestParams, ...withdrawParams};
        try {
            await deposit({
                params,
                onSuccess: results => {
                    setDepositIsSuccess(true)
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    const handleTransaction = async (amount: number, sendCallback: typeof sendDeposit | typeof sendWithdraw) => {
        if (amount < formattedAllowance) {
            await sendCallback(amount)
            return
        }

        const approveParams = {
            params: { spender: stakingAddress, amount: parseUnits(String(amount * 2), 18) }
        }

        const params = { ...paycerTokenApproveRequestParams, ...approveParams};

        try {
            await approve({
                params,
                onSuccess: async() => {
                    await sendCallback(amount)
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    const handleDeposit = async (amount: number) => {
        await handleTransaction(amount, sendDeposit)
    }

    const handleWithdraw = async (amount: number) => {
        await handleTransaction(amount, sendWithdraw)
    }

    useEffect(() => {
        const fetch = async () => {
            const options = {
                contractAddress: stakingAddress,
                functionName: 'userInfo',
                abi: StakingContractProvider.abi,
                params: { beneficiary: wallet.address },
            }
            try {
                // @ts-ignore
                const response:UserInfoRequest = await Moralis.executeFunction(options)
                if (response) {
                    setUserInfo(response)
                }
            } catch(e) {
                console.log(e)
            }
        }
        fetch()
    }, [wallet.address])

    useEffect(() => {
        const fetch = async () => {
            const options = {
                contractAddress: stakingAddress,
                functionName: 'rewardAPY',
                abi: StakingContractProvider.abi,
                params: { _user: wallet.address },
            }
            try {
                // @ts-ignore
                const response:BigNumber = await Moralis.executeFunction(options)
                if (response && BigNumber.isBigNumber(response)) {
                    setRewardRate(response.toNumber() / 100)
                }
            } catch(e) {
                console.log(e)
            }
        }
        fetch()
    }, [wallet.address])

    useEffect(() => {
        const fetch = async () => {
            const options = {
                contractAddress: stakingAddress,
                functionName: 'pendingReward',
                abi: StakingContractProvider.abi,
                params: { _user: wallet.address },
            }
            try {
                // @ts-ignore
                const response = await Moralis.executeFunction(options)
                if (response && BigNumber.isBigNumber(response)) {
                    setPendingReward(Number(formatUnits(response, 18)))
                }
            } catch(e) {
                console.log(e)
            }
        }
        fetch()
    }, [wallet.address])


    const handleClaim = async () => {
        /*
        setLoading(true)
        try {
            await sendClaim(wallet.address)
        } catch(e) {
            setClaimError(true)
        }
        setLoading(true)

         */
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
        withdrawIsLoading,
        withdrawIsFetching,
        withdrawError,
        withdrawIsSuccess,

        depositIsLoading,
        depositIsFetching,
        depositError,
        depositIsSuccess,

        claimIsLoading,
        claimIsFetching,
        claimError,
        claimIsSuccess,

        approveIsLoading,
        approveIsFetching,
        approveError,
        showFormApproveModal,
        setShowFormApproveModal,
    }
}
