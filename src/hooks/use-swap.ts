import { useSendTransaction } from '@usedapp/core'
import { useState } from 'react'
import { SwapProps } from '@components/organisms/swap/types'
import {FormikValues} from "formik";

interface UseSwapProps {
    handleSwap: (values: FormikValues) => void
    resetStatus: () => void
    swapTx: any
    approveTx: any
    swapError?: boolean
    isLoading?: boolean
    showFormApproveModal: boolean
    setShowFormApproveModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function useSwap():UseSwapProps {

    const { sendTransaction: sendApproveTransaction , state: approveTx } = useSendTransaction({ transactionName: 'approve' })
    const { sendTransaction: sendSwapTransaction , state: swapTx } = useSendTransaction({ transactionName: 'swap' })

    const [showFormApproveModal, setShowFormApproveModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [swapError, setSwapError] = useState(false)

    const handleSwap = async (values: SwapProps) => {
        setIsLoading(true)
        try {
            if (!values.tradeContext.hasEnoughAllowance && values.tradeContext.approvalTransaction) {
                const approved = await sendApproveTransaction(values.tradeContext.approvalTransaction)
                console.log(approved)
                console.log(approveTx)
            }
            if (values.tradeContext.transaction) {
                const approved = await sendSwapTransaction(values.tradeContext.transaction)
                console.log(approved)
                console.log(swapTx)
            }
        } catch {
            setSwapError(true)
        }
        setIsLoading(false)
    }

    const resetStatus = () => {
        swapTx.status = 'None'
        approveTx.status = 'None'
    }

    return {
        swapTx,
        approveTx,
        swapError,
        resetStatus,
        handleSwap,
        showFormApproveModal,
        setShowFormApproveModal,
        isLoading
    }
}
