import { useSendTransaction } from '@usedapp/core'
import useWallet from '@hooks/use-wallet'
import { useState } from 'react'
import useNetwork from "@hooks/use-network";
import {NetworkSettingsInterface, Trade, TradeContext, UniswapProvider} from '../lib/trade'
import { SwapProps } from '@components/organisms/swap/swap-form/types'

interface UseSwapProps {
    networkSettings: NetworkSettingsInterface
    tradeContext: TradeContext
    initFactory: (SwapProps) => Promise<TradeContext>
    handleSwap: (SwapProps) => void
    resetStatus: () => void
    swapTx: any
    approveTx: any
    swapError?: boolean
    isLoading?: boolean
    showFormApproveModal: boolean
    setShowFormApproveModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function useSwap():UseSwapProps {
    const network = useNetwork()
    const wallet = useWallet()
    const provider = new UniswapProvider()
    const tradeFactory = new Trade(provider)

    const { sendTransaction: sendApproveTransaction , state: approveTx } = useSendTransaction({ transactionName: 'approve' })
    const { sendTransaction: sendSwapTransaction , state: swapTx } = useSendTransaction({ transactionName: 'swap' })

    const [tradeContext, setTradeContext] = useState<TradeContext|undefined>(undefined)
    const [showFormApproveModal, setShowFormApproveModal] = useState(false)
    const [isLoading, setLoading] = useState(false)
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

    const initFactory = async (values: SwapProps) => {
        const tradeContext = await tradeFactory.init(
            values.tradePair,
            values.tradeSettings,
            values.networkSettings
        )

        setTradeContext(tradeContext)

        return tradeContext
    }

    const handleSwap = async (values: SwapProps) => {
        setLoading(true)
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
        setLoading(false)
    }

    const resetStatus = () => {
        swapTx.status = 'None'
        approveTx.status = 'None'
    }

    return {
        networkSettings,
        tradeContext,
        initFactory,
        swapTx,
        approveTx,
        swapError,
        resetStatus,
        handleSwap,
        showFormApproveModal,
        setShowFormApproveModal,
        isLoading,
    }
}
