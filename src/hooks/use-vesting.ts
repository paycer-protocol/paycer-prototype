import { BigNumber } from '@ethersproject/bignumber'
import ChainId from '@providers/chain-id'
import { formatUnits } from '@ethersproject/units'
import VestingContractProvider from '@providers/vesting'
import { useWeb3Auth } from '@context/web3-auth-context'
import { useEffect, useState, useMemo } from 'react'
import { calculateEndTime, calculateNextDistribution, calculateStartTime } from '../helpers/vesting-helper'
import Moralis from 'moralis'
import { useWeb3ExecuteFunction } from 'react-moralis'

interface UseVestingProps {
    withdraw: () => Promise<void>
    withdrawAble: number
    totalAmount: number
    amountWithdrawn: number
    withdrawIsLoading: boolean
    withdrawIsFetching: boolean
    withdrawIsError: boolean
    withdrawIsSuccess: boolean
    showFormApproveModal: boolean
    startTime: string
    endTime: string
    nextDistribution: string
    setShowFormApproveModal: React.Dispatch<React.SetStateAction<boolean>>
}

type RecipientsResponse = {
    totalAmount: BigNumber
    amountWithdrawn: BigNumber
}

export default function useVesting(type):UseVestingProps {
    const { currentChainId, walletAddress } = useWeb3Auth()

    const vestingConfig = VestingContractProvider[currentChainId] ? VestingContractProvider[currentChainId] : VestingContractProvider[ChainId.Polygon]
    const vestingAddress = vestingConfig[type].address

    const [withdrawAble, setWithdrawAble] = useState<number>(0)
    const [startTime, setStartTime] = useState<number>(0)
    const [releaseInterval, setReleaseInterval] = useState<number>(0)
    const [totalAmount, setTotalAmount] = useState<number>(0)
    const [withdrawIsSuccess, setWithdrawIsSuccess] = useState<boolean>(false)
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
    }, [walletAddress])

    const withdrawVesting = async () => {
        try {
            await withdraw({
                params: vestingWithdrawRequestParams,
                onSuccess: results => {
                    setWithdrawIsSuccess(true)
                    setWithdrawAble(0)
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const fetch = async () => {
            const options = {
                contractAddress: vestingAddress,
                functionName: 'startTime',
                abi: vestingConfig.abi
            }
            try {
                const response = await Moralis.executeFunction(options)
                if (response && BigNumber.isBigNumber(response)) {
                    setStartTime(response.toNumber())
                }
            } catch(e) {
                console.log(e)
            }
        }
        fetch()
    }, [walletAddress])

    useEffect(() => {
        const fetch = async () => {
            const options = {
                contractAddress: vestingAddress,
                functionName: 'releaseInterval',
                abi: vestingConfig.abi
            }
            try {
                const response = await Moralis.executeFunction(options)
                if (response && BigNumber.isBigNumber(response)) {
                    setReleaseInterval(response.toNumber())
                }
            } catch(e) {
                console.log(e)
            }
        }
        fetch()
    }, [walletAddress])

    useEffect(() => {
        const fetch = async () => {
            const options = {
                contractAddress: vestingAddress,
                functionName: 'withdrawable',
                abi: vestingConfig.abi,
                params: { beneficiary: walletAddress },
            }

            try {
                const response = await Moralis.executeFunction(options)
                if (response && BigNumber.isBigNumber(response)) {
                    setWithdrawAble(Number(formatUnits(response, 18)))
                }
            } catch(e) {
                console.log(e)
            }
        }
        fetch()
    }, [walletAddress])


    useEffect(() => {
        const fetch = async () => {
            const options = {
                contractAddress: vestingAddress,
                functionName: 'recipients',
                abi: vestingConfig.abi,
                params: { beneficiary: walletAddress },
            }
            try {
                // @ts-ignore
                const response:RecipientsResponse = await Moralis.executeFunction(options)
                if (response) {
                    setTotalAmount(Number(formatUnits(response?.totalAmount, 18)))
                    setAmountWithdrawn(Number(formatUnits(response?.amountWithdrawn, 18)))
                }
            } catch(e) {
                console.log(e)
            }
        }
        fetch()

    }, [walletAddress])

    return {
        withdrawAble,
        totalAmount,
        amountWithdrawn,
        withdrawIsLoading,
        withdrawIsFetching,
        withdrawIsSuccess,
        withdrawIsError: !!withdrawError,
        withdraw: withdrawVesting,
        showFormApproveModal,
        setShowFormApproveModal,
        startTime: calculateStartTime(startTime).format('MM/DD/YYYY, h:mm:ss a'),
        endTime: calculateEndTime(startTime, type).format('MM/DD/YYYY, h:mm:ss a'),
        nextDistribution: calculateNextDistribution(startTime, releaseInterval).format('MM/DD/YYYY, h:mm:ss a')
    }
}