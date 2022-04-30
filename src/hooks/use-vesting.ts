import { useContractFunction } from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import { ChainId } from '@usedapp/core'
import { Contract } from '@ethersproject/contracts'
import { formatUnits } from '@ethersproject/units'
import VestingContractProvider from '@providers/vesting'
import useWallet from '@hooks/use-wallet'
import { useEffect, useState } from 'react'
import {
    calculateEndTime,
    calculateNextDistribution,
    calculateStartTime
} from '../helpers/vesting-helper'
import Moralis from 'moralis'
import { useWeb3ExecuteFunction } from "react-moralis";

interface UseVestingProps {
    withdraw: () => Promise<void>
    withdrawAble: number
    totalAmount: number
    resetStatus: () => void
    amountWithdrawn: number
    withdrawTx: any
    withdrawError?: boolean
    isLoading?: boolean
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
    const wallet = useWallet()
    const { chainId } = wallet
    const vestingConfig = VestingContractProvider[chainId] ? VestingContractProvider[chainId] : VestingContractProvider[ChainId.Polygon]
    const vestingAddress = vestingConfig[type].address

    const vestingContract = new Contract(vestingAddress, vestingConfig.abi)
    const [withdrawAble, setWithdrawAble] = useState<number>(0)
    const [startTime, setStartTime] = useState<number>(0)
    const [releaseInterval, setReleaseInterval] = useState<number>(0)
    const [totalAmount, setTotalAmount] = useState<number>(0)
    const [amountWithdrawn, setAmountWithdrawn] = useState<any>(null)
    const { data, error, fetch: withdraw, isFetching, isLoading } = useWeb3ExecuteFunction()
    const [showFormApproveModal, setShowFormApproveModal] = useState(false)
    const [withdrawError, setWithdrawError] = useState(false)

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
    }, [])

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
    }, [])

    useEffect(() => {
        const fetch = async () => {
            const options = {
                contractAddress: vestingAddress,
                functionName: 'withdrawable',
                abi: vestingConfig.abi,
                params: { beneficiary: wallet.address },
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
    }, [])


    useEffect(() => {
        const fetch = async () => {
            const options = {
                contractAddress: vestingAddress,
                functionName: 'recipients',
                abi: vestingConfig.abi,
                params: { beneficiary: wallet.address },
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

    }, [wallet.address])


    const resetStatus = () => {

    }

    // @ts-ignore

    const withdrawVesting = async () => {
        try {
            await withdraw()
        } catch (e) {
            setWithdrawError(true)
        }
    }

    return {
        withdrawAble,
        totalAmount,
        amountWithdrawn,
        withdrawTx,
        withdrawError,
        resetStatus,
        withdraw: withdrawVesting,
        showFormApproveModal,
        setShowFormApproveModal,
        isLoading: false,
        startTime: calculateStartTime(startTime).format('MM/DD/YYYY, h:mm:ss a'),
        endTime: calculateEndTime(startTime, type).format('MM/DD/YYYY, h:mm:ss a'),
        nextDistribution: calculateNextDistribution(startTime, releaseInterval).format('MM/DD/YYYY, h:mm:ss a')
    }
}