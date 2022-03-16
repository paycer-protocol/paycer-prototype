import { useSendTransaction } from '@usedapp/core'
import useWallet from '@hooks/use-wallet'
import { useState } from 'react'
import useNetwork from "@hooks/use-network";
import {NetworkSettingsInterface, Trade, TradeContext, UniswapProvider} from '../lib/trade'
import { SwapProps } from '@components/organisms/swap/types'
import {FormikValues} from "formik";

export enum QuoteChangedStatus {
    UP = "up",
    DOWN = "down",
}

interface UseSwapProps {
    networkSettings: NetworkSettingsInterface
    initFactory: (values: SwapProps, setFieldValue, setValues) => Promise<TradeContext>
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
    const network = useNetwork()
    const wallet = useWallet()
    const provider = new UniswapProvider()
    const tradeFactory = new Trade(provider)

    const { sendTransaction: sendApproveTransaction , state: approveTx } = useSendTransaction({ transactionName: 'approve' })
    const { sendTransaction: sendSwapTransaction , state: swapTx } = useSendTransaction({ transactionName: 'swap' })

    const [showFormApproveModal, setShowFormApproveModal] = useState(false)
    const [showQuoteChangedModal, setShowQuoteChangedModal] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [quoteChangedStatus, setQuoteChangedStatus] = useState<QuoteChangedStatus | null>(null)
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

    const initFactory = async (values: SwapProps, setFieldValue, setValues) => {
        const tradeContext = await tradeFactory.init(
            values.tradePair,
            values.tradeSettings,
            networkSettings
        )
        console.log(tradeContext)

        tradeContext.quoteChanged$.subscribe((nextTradeContext: TradeContext) => {
            console.log('YO')
            onQuoteChanged(tradeContext, nextTradeContext, values, setValues, setFieldValue)
        })

        return tradeContext
    }

    const onQuoteChanged = (tradeContext, nextTradeContext, values, setValues, setFieldValue) => {
        console.log(nextTradeContext.expectedConvertQuote, tradeContext.expectedConvertQuote)

        if (nextTradeContext.expectedConvertQuote === tradeContext.expectedConvertQuote) {
            console.log('none')
            setFieldValue('quoteChangedStatus', null)
            return
        }

        if (nextTradeContext.expectedConvertQuote > tradeContext.expectedConvertQuote) {
            setFieldValue('quoteChangedStatus', QuoteChangedStatus.UP)
            console.log('up')
        } else if (nextTradeContext.expectedConvertQuote < tradeContext.expectedConvertQuote) {
            setFieldValue('quoteChangedStatus', QuoteChangedStatus.DOWN)
            console.log('down')
        }

        const nextValues = {
            ...values,
            ... {
                token0Value: values.token0Value,
                token1Value: Number(values.token0Value) * Number(nextTradeContext?.expectedConvertQuote),
            }
        }

        setValues(nextValues)
        setFieldValue('tradeContext', nextTradeContext)
        console.log('setField')
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
        initFactory,
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
