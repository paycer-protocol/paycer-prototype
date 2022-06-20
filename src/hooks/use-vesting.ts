import { BigNumber } from '@ethersproject/bignumber'
import ChainId from '@providers/chain-id'
import {formatUnits, parseUnits} from '@ethersproject/units'
import VestingContractProvider from '@providers/vesting'
import { useDapp } from '@context/dapp-context'
import { useEffect, useState, useMemo } from 'react'
import { calculateEndTime, calculateNextDistribution, calculateStartTime } from '../helpers/vesting-helper'
import Moralis from 'moralis'
import { useWeb3ExecuteFunction } from 'react-moralis'

enum TRANSACTION_STATE {
    "NONE" = 0,
    "TRANSACTION" = 1
}

interface UseVestingProps {
    withdraw: () => Promise<void>
    withdrawAble: number
    totalAmount: number
    amountWithdrawn: number
    showFormApproveModal: boolean
    startTime: string
    endTime: string
    nextDistribution: string
    setShowFormApproveModal: React.Dispatch<React.SetStateAction<boolean>>
    isLoading: boolean
    contractCallError: Error
    transactionState: TRANSACTION_STATE
    withdrawIsSuccess: boolean
    resetStatus: () => void
}

type RecipientsResponse = {
    totalAmount: BigNumber
    amountWithdrawn: BigNumber
}

export default function useVesting(type):UseVestingProps {
    const { currentNetworkId, walletAddress, currentNetwork, fetchPcrBalance, isInitialized } = useDapp()
    const vestingConfig = VestingContractProvider[currentNetworkId] ? VestingContractProvider[currentNetworkId] : VestingContractProvider[ChainId.Polygon]
    const vestingAddress = vestingConfig[type].address
    const [withdrawAble, setWithdrawAble] = useState<number>(0)
    const [startTime, setStartTime] = useState<number>(0)
    const [releaseInterval, setReleaseInterval] = useState<number>(0)
    const [totalAmount, setTotalAmount] = useState<number>(0)
    const [withdrawIsSuccess, setWithdrawIsSuccess] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [transactionState, setTransactionState] = useState<TRANSACTION_STATE>(0)
    const [contractCallError, setContractCallError] = useState<Error | null>(null)
    const [amountWithdrawn, setAmountWithdrawn] = useState<any>(null)
    const [showFormApproveModal, setShowFormApproveModal] = useState(false)

    const { data, error: withdrawError, fetch: withdraw, isFetching: withdrawIsFetching, isLoading: withdrawIsLoading } = useWeb3ExecuteFunction()

    const vestingWithdrawRequestParams = useMemo(() => {
        return (
            {
                contractAddress: vestingAddress,
                functionName: 'withdraw',
                abi: vestingConfig.abi,
                params: { beneficiary: walletAddress },
            }
        )
    }, [currentNetworkId, walletAddress, isInitialized])

    const handleClaim = async () => {
        setIsLoading(true)

        try {
            const withdrawTx = await withdraw({
                params: vestingWithdrawRequestParams,
            })

            if (withdrawTx) {
                //@ts-ignore
                await withdrawTx.wait()
                setIsLoading(false)
                setWithdrawAble(0)
                fetchPcrBalance()
                setWithdrawIsSuccess(true)
            }

        } catch (error) {
            if (error.code && error.code === 'TRANSACTION_REPLACED') {
                if (error.cancelled) {
                    setContractCallError(new Error('Claim has been canceled.'))
                } else {
                    //  was speeded up
                    setWithdrawIsSuccess(true)
                }
            } else {
                setContractCallError(new Error('Claim failed. Please try again.'))
            }
        } finally {
            setIsLoading(false)
        }
    }

    const fetchStarttime = () => {
        if (isInitialized && walletAddress) {
            const fetch = async () => {
                const options = {
                    chain: currentNetwork.chainName.toLowerCase(),
                    address: vestingAddress,
                    function_name: 'startTime',
                    abi: vestingConfig.abi
                }
                try {
                    const response = await Moralis.Web3API.native.runContractFunction(options)
                    if (response) {
                        setStartTime(Number(response))
                    }
                } catch (e) {
                    console.log(e)
                }
            }
            fetch()
        }
    }

    const fetchReleaseInterval = () => {
        if (isInitialized && walletAddress) {
            const fetch = async () => {
                const options = {
                    chain: currentNetwork.chainName.toLowerCase(),
                    address: vestingAddress,
                    function_name: 'releaseInterval',
                    abi: vestingConfig.abi
                }
                try {
                    const response = await Moralis.Web3API.native.runContractFunction(options)
                    if (response) {
                        setReleaseInterval(Number(response))
                    }
                } catch (e) {
                    console.log(e)
                }
            }
            fetch()
        }
    }

    const fetchWithdrawable = () => {
        if (isInitialized && walletAddress) {
            const fetch = async () => {
                const options = {
                    chain: currentNetwork.chainName.toLowerCase(),
                    address: vestingAddress,
                    function_name: 'withdrawable',
                    abi: vestingConfig.abi,
                    params: {beneficiary: walletAddress},
                }

                try {
                    const response = await Moralis.Web3API.native.runContractFunction(options)
                    if (response) {
                        setWithdrawAble(Number(formatUnits(response, 18)))
                    }
                } catch (e) {
                    console.log(e)
                }
            }
            fetch()
        }
    }

    const fetchRecipients = () => {
        if (isInitialized && walletAddress) {
            const fetch = async () => {
                const options = {
                    chain: currentNetwork.chainName.toLowerCase(),
                    address: vestingAddress,
                    function_name: 'recipients',
                    abi: vestingConfig.abi,
                    params: {beneficiary: walletAddress},
                }
                try {
                    // @ts-ignore
                    const response: RecipientsResponse = await Moralis.Web3API.native.runContractFunction(options)
                    if (response) {
                        setTotalAmount(Number(formatUnits(response?.totalAmount, 18)))
                        setAmountWithdrawn(Number(formatUnits(response?.amountWithdrawn, 18)))
                    }
                } catch (e) {
                    console.log(e)
                }
            }
            fetch()
        }
    }

    useEffect(() => {
        fetchRecipients()
        fetchWithdrawable()
        fetchReleaseInterval()
        fetchStarttime()
    }, [walletAddress, currentNetworkId])

    const resetStatus = () => {
        setWithdrawIsSuccess(false)
        setContractCallError(null)
        setIsLoading(false)
        setTransactionState(0)
    }

    return {
        withdrawAble,
        totalAmount,
        amountWithdrawn,
        isLoading,
        contractCallError,
        transactionState,
        withdrawIsSuccess,
        withdraw: handleClaim,
        showFormApproveModal,
        setShowFormApproveModal,
        startTime: calculateStartTime(startTime).format('MM/DD/YYYY, h:mm:ss a'),
        endTime: calculateEndTime(startTime, type).format('MM/DD/YYYY, h:mm:ss a'),
        nextDistribution: calculateNextDistribution(startTime, releaseInterval).format('MM/DD/YYYY, h:mm:ss a'),
        resetStatus
    }
}