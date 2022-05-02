import {useEffect, useMemo, useState} from 'react'
import Moralis from 'moralis'
import { useWeb3ExecuteFunction, useMoralisWeb3Api } from 'react-moralis'
import { BigNumber } from '@ethersproject/bignumber'
import { formatUnits, parseUnits } from '@ethersproject/units'
import StakingContractProvider from '@providers/staking'
import PaycerTokenContractProvider from '@providers/paycer-token'
import ChainId from '@providers/chain-id'
import { formatLastRewardtime } from '../helpers/staking-helper'
import useToken from '@hooks/use-token'
import useWallet from '@hooks/use-wallet'
import useNetwork from '@hooks/use-network'

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
    withdrawIsSuccess: boolean

    depositIsLoading: boolean
    depositIsFetching: boolean
    depositIsSuccess: boolean

    claimIsLoading: boolean
    claimIsFetching: boolean
    claimIsSuccess: boolean

    approveIsLoading: boolean
    approveIsFetching: boolean

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
    const { address: walletAddress } = useWallet()
    const { currentChainId, currentChainIdBinary } = useNetwork()
    const PCRToken = useToken('PCR')
    const Web3Api = useMoralisWeb3Api()
    const stakingAddress = StakingContractProvider[currentChainId] || StakingContractProvider[ChainId.Polygon]

    const [showFormApproveModal, setShowFormApproveModal] = useState(false)

    const [withdrawIsSuccess, setWithdrawIsSuccess] = useState<boolean>(false)
    const [depositIsSuccess, setDepositIsSuccess] = useState<boolean>(false)
    const [claimIsSuccess, setClaimIsSuccess] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<UserInfoRequest | null>(null)
    const [rewardRate, setRewardRate] = useState<number>(12)
    const [tokenAllowance, setTokenAllowance] = useState<number>(0)
    const [contractCallError, setContractCallError] = useState<Error | null>(null)
    const [pendingReward, setPendingReward] = useState<number>(0)

    const paycerTokenConfig = PaycerTokenContractProvider[currentChainId] || PaycerTokenContractProvider[ChainId.Polygon]
    const paycerToken = paycerTokenConfig.contract

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
            params: { to: walletAddress, amount:  parseUnits(String(amount), 18) }
        }
        const params = { ...stakingRequestParams, ...withdrawParams};
        try {
            await withdraw({
                params,
                onComplete: () => {
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
            params: { to: walletAddress, amount:  parseUnits(String(amount), 18) }
        }
        const params = { ...stakingRequestParams, ...withdrawParams};
        try {
            await deposit({
                params,
                onComplete: () => {
                    setDepositIsSuccess(true)
                }
            })
        } catch (e) {
            console.log(e)
        }
        console.log('DEPEND')
    }

    const handleTransaction = async (amount: number, sendCallback: typeof sendDeposit | typeof sendWithdraw) => {
        if (amount < tokenAllowance) {
            console.log(amount, tokenAllowance)
            await sendCallback(amount)
        } else {
            console.log('with approve')
            const approveParams = {
                params: { spender: stakingAddress, amount: parseUnits(String(amount * 2), 18) }
            }

            const params = { ...paycerTokenApproveRequestParams, ...approveParams};

            try {
                await approve({
                    params
                })
                await sendCallback(amount)
            } catch (e) {
                console.log(e)
            }
        }
    }

    const handleClaim = async () => {
        const claimParams = {
            functionName: 'claim',
            params: { to: walletAddress }
        }
        const params = { ...stakingRequestParams, ...claimParams};
        try {
            await claim({
                params,
                onComplete: () => {
                    setClaimIsSuccess(true)
                    setPendingReward(0)
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
        if (walletAddress) {
            const fetch = async () => {
                const options = {
                    chain: currentChainIdBinary,
                    owner_address: walletAddress,
                    spender_address: stakingAddress,
                    address: paycerToken.address,
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

    }, [walletAddress])

    useEffect(() => {
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
    }, [walletAddress])

    useEffect(() => {
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
    }, [walletAddress])

    useEffect(() => {
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

    }, [walletAddress])

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
        withdrawIsSuccess,

        depositIsLoading,
        depositIsFetching,
        depositIsSuccess,

        claimIsLoading,
        claimIsFetching,
        claimIsSuccess,

        contractCallError,

        approveIsLoading,
        approveIsFetching,
        showFormApproveModal,
        setShowFormApproveModal,


        resetStatus
    }
}
