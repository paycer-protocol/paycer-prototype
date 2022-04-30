import { useContractCall, useContractFunction } from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import { ChainId } from '@usedapp/core'
import { Contract } from '@ethersproject/contracts'
import { formatUnits } from '@ethersproject/units'
import VestingContractProvider from '@providers/vesting'
import useWallet from '@hooks/use-wallet'
import { Interface } from '@ethersproject/abi'
import {useEffect, useState} from 'react'
import moment from 'moment'
import {
    calculateEndTime,
    calculateNextDistribution,
    calculateStartTime
} from '../helpers/vesting-helper'
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis'
import Moralis from 'moralis'
import ExecuteFunctionResult = Moralis.ExecuteFunctionResult;

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

export default function useVesting(type):UseVestingProps {
    const wallet = useWallet()
    const { chainId } = wallet
    const vestingConfig = VestingContractProvider[chainId] ? VestingContractProvider[chainId] : VestingContractProvider[ChainId.Polygon]
    const vestingAddress = vestingConfig[type].address
    const vestingContract = new Contract(vestingAddress, vestingConfig.abi)
    const [withdrawAble, setWithdrawAble] = useState<number>(0)


    const [startTime, setStartTime] = useState<number>(0)
    const [releaseInterval, setReleaseInterval] = useState<number>(0)

    const [recipients, setRecipients] = useState<any>(null)
    const [showFormApproveModal, setShowFormApproveModal] = useState(false)
    const [withdrawError, setWithdrawError] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            const options = {
                contractAddress: vestingAddress,
                functionName: 'startTime',
                abi: vestingConfig.abi
            }
            const response = await Moralis.executeFunction(options)
            if (response && BigNumber.isBigNumber(response)) {
                setStartTime(response.toNumber())
            }
        }
        try {
            fetch()
        } catch(e) {
            console.log(e)
        }

    }, [])

    useEffect(() => {
        const fetch = async () => {
            const options = {
                contractAddress: vestingAddress,
                functionName: 'releaseInterval',
                abi: vestingConfig.abi
            }
            const response = await Moralis.executeFunction(options)
            if (response && BigNumber.isBigNumber(response)) {
                setReleaseInterval(response.toNumber())
            }
        }
        try {
            fetch()
        } catch(e) {
            console.log(e)
        }

    }, [])

    useEffect(() => {
        const fetch = async () => {
            const options = {
                contractAddress: vestingAddress,
                functionName: 'withdrawable',
                abi: vestingConfig.abi,
                params: { beneficiary: wallet.address },
            }
            const response = await Moralis.executeFunction(options)
            if (response && BigNumber.isBigNumber(response)) {
                setWithdrawAble(Number(formatUnits(response, 18)))
            }
        }
        try {
            fetch()
        } catch(e) {
            console.log(e)
        }

    }, [])

    const fetchRecipients = async() => {
        const options = {
            contractAddress: vestingAddress,
            functionName: 'recipients',
            abi: vestingConfig.abi,
            params: { beneficiary: wallet.address },
        }
        try {
            const recipients = await Moralis.executeFunction(options)
            if (recipients) {

                console.log(recipients, 's')

            }
        } catch(e) {
            console.log(e, 'hi')
        }
    }

    const { send: withdraw, state: withdrawTx } = useContractFunction(vestingContract, 'withdraw')

    const resetStatus = () => {
        withdrawTx.status = 'None'
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
        totalAmount: 0,
        amountWithdrawn: 0,
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

//.format('MM/DD/YYYY, h:mm:ss a')