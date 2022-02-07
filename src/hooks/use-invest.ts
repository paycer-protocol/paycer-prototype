import { useContractCall, useContractFunction } from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import { ChainId } from '@usedapp/core'
import { Contract } from '@ethersproject/contracts'
import { formatUnits } from '@ethersproject/units'
import VestingContractProvider from '@providers/vesting'
import useWallet from '@hooks/use-wallet'
import { Interface } from '@ethersproject/abi'
import { useState } from 'react'
import moment from 'moment'
import {FormikHelpers, FormikValues} from "formik";

interface UseInvestProps {
    handleSwap: () => Promise<void>
    resetStatus: () => void
    swapTx: any
    swapError?: boolean
    isLoading?: boolean
    showFormApproveModal: boolean
    setShowFormApproveModal: React.Dispatch<React.SetStateAction<boolean>>
    setInvestFieldValues: (setFieldValue: any, values: FormikValues, investAmount: number) => void
}

export default function useInvest():UseInvestProps {
    const wallet = useWallet()
    const { chainId } = wallet


    const [showFormApproveModal, setShowFormApproveModal] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [swapError, setSwapError] = useState(false)

    const { send: swap, state: swapTx } = useContractFunction(null, 'swap')

    const handleSwap = async () => {
        setLoading(true)
        try {
            await swap()
        } catch(e) {
            setSwapError(true)
        }

        setLoading(false)
    }

    const setInvestFieldValues = (setFieldValue, values, investAmount) => {
        setFieldValue('investAmount', investAmount)
        const dailyRewards = investAmount * values.rewardRate / 100 / 365
        setFieldValue('dailyRewards', dailyRewards)
        const dailyInterest = investAmount * values.interestRate / 100 / 365
        setFieldValue('dailyInterest', dailyInterest)
        const fee = investAmount * values.investFee / 100
        setFieldValue('fee', fee)

    }

    const resetStatus = () => {
        swapTx.status = 'None'
    }

    return {
        swapTx,
        swapError,
        resetStatus,
        handleSwap,
        showFormApproveModal,
        setShowFormApproveModal,
        isLoading,
        setInvestFieldValues
    }
}
