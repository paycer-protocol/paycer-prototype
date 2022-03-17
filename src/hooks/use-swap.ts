import { useSendTransaction } from '@usedapp/core'
import { useState } from 'react'
import { SwapProps } from '@components/organisms/swap/types'
import {FormikValues} from "formik";
import useNetwork from "@hooks/use-network";
import useWallet from "@hooks/use-wallet";
import {NetworkSettingsInterface} from "../lib/trade";

interface UseSwapProps {
    handleSwap: (values: FormikValues) => void
    resetStatus: () => void
    swapTx: any
    approveTx: any
    swapError?: boolean
    isLoading?: boolean
    showFormApproveModal: boolean
    setShowFormApproveModal: React.Dispatch<React.SetStateAction<boolean>>
    networkSettings: NetworkSettingsInterface
}

export default function useSwap():UseSwapProps {

    const network = useNetwork()
    const wallet = useWallet()

    const { sendTransaction: sendApproveTransaction , state: approveTx } = useSendTransaction({ transactionName: 'approve' })
    const { sendTransaction: sendSwapTransaction , state: swapTx } = useSendTransaction({ transactionName: 'swap' })

    const [showFormApproveModal, setShowFormApproveModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [swapError, setSwapError] = useState(false)

    const networkSettings = {
        providerUrl: network.rpcUrls[0],
        walletAddress: wallet.address,
        networkProvider: network.provider,
        chainId: network.chainId,
        nameNetwork: network.chainName,
        multicallContractAddress: network.multicallAddress,
        nativeCurrency: network.nativeCurrency,
        nativeWrappedTokenInfo: network.nativeWrappedTokenInfo
    }

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
        isLoading,
        networkSettings
    }
}
