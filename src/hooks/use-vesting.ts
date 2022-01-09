import { useContractCall, useContractFunction } from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import { ChainId } from '@usedapp/core'
import addMonth from '../helpers/add-month'
import { Contract } from '@ethersproject/contracts'
import { formatUnits } from '@ethersproject/units'
import VestingContractProvider from '@providers/vesting'
import useWallet from '@hooks/use-wallet'
import { Interface } from '@ethersproject/abi'
import { useState } from 'react'
import moment from 'moment'

interface UseVestingProps {
    withdraw: () => Promise<void>
    withdrawAble: number
    totalAmount: number
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
    const vestingConfig = VestingContractProvider[chainId] ? VestingContractProvider[chainId] : VestingContractProvider[ChainId.Mumbai]
    const vestingAddress = vestingConfig[type].address
    const vestingContract = new Contract(vestingAddress, vestingConfig.abi)

    const [showFormApproveModal, setShowFormApproveModal] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [withdrawError, setWithdrawError] = useState(false)
    const { send: withdraw, state: withdrawTx } = useContractFunction(vestingContract, 'withdraw')

    let [withdrawAble] = useContractCall({
        abi: new Interface(vestingConfig.abi),
        address: vestingAddress,
        method: 'withdrawable',
        args: [wallet.address],
    }) ?? []

    let [totalAmount, amountWithdrawn] = useContractCall({
        abi: new Interface(vestingConfig.abi),
        address: vestingAddress,
        method: 'recipients',
        args: [wallet.address],
    }) ?? []

    let [startTime] = useContractCall({
        abi: new Interface(vestingConfig.abi),
        address: vestingAddress,
        method: 'startTime',
        args: [],
    }) ?? []

    let [releaseInterval] = useContractCall({
        abi: new Interface(vestingConfig.abi),
        address: vestingAddress,
        method: 'releaseInterval',
        args: [],
    }) ?? []

    function getVestingMonths():number {
        switch (type) {
            case 'public':
                return 6
            case 'team':
                return 36
            default:
                return 12
        }
    }

    function getEndTime():any {
        if (!startTime) {
            return null
        }
        const momentStartTime = moment(startTime.toNumber() * 1000)
        return momentStartTime.add(getVestingMonths(), 'months')

    }

    function calculateNextDistribution():any {
        if (!startTime) {
            return null
        }
        const momentStartTime = moment(startTime.toNumber() * 1000)
        const currentTime = moment()
        const timePassed = currentTime.diff(momentStartTime)
        const passedIntervals = timePassed / (releaseInterval * 1000)
        return momentStartTime.add(Math.ceil(passedIntervals) * releaseInterval, 'seconds')
    }

    withdrawAble = BigNumber.isBigNumber(withdrawAble) ? Number(formatUnits(withdrawAble, 18)) : 0
    totalAmount = BigNumber.isBigNumber(totalAmount) ? Number(formatUnits(totalAmount, 18)) : 0
    amountWithdrawn = BigNumber.isBigNumber(amountWithdrawn) ? Number(formatUnits(amountWithdrawn, 18)) : 0
    releaseInterval = BigNumber.isBigNumber(releaseInterval) ? Number(releaseInterval) : 0
    const nextDistribution = calculateNextDistribution() && startTime ? calculateNextDistribution().format('MM/DD/YYYY, h:mm:ss a') : null
    const endTime = calculateNextDistribution() && startTime ? getEndTime().format('MM/DD/YYYY, h:mm:ss a') : null
    // @ts-ignore
    startTime = startTime ? moment(startTime.toNumber() * 1000).format('MM/DD/YYYY, h:mm:ss a') : null



    const withdrawVesting = async () => {
        setLoading(true)
        /* TODO DEFINE BETTER ERROR HANDLING FOR FRONTEND NOTIFICATIONS */
        try {
            await withdraw()
            if (withdrawTx.status === 'Success' || withdrawTx.status === 'None') {
                setShowFormApproveModal(false)
            }
        } catch(e) {
            setWithdrawError(true)
        }

        setLoading(false)
    }

    return {
        withdrawAble,
        totalAmount,
        amountWithdrawn,
        withdrawTx,
        withdrawError,
        withdraw: withdrawVesting,
        showFormApproveModal,
        setShowFormApproveModal,
        isLoading,
        startTime,
        endTime,
        nextDistribution
    }
}
