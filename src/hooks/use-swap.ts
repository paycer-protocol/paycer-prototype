import { useSendTransaction } from '@usedapp/core'
import Moralis from "moralis";
import {useEffect, useState} from 'react'
import { SwapProps } from '@components/organisms/swap/types'
import {FormikValues} from "formik";
import {useDapp} from "@context/dapp-context";
import {swapTokens} from '@config/market-pairs'

interface UseSwapProps {
    handleSwap: (values: FormikValues) => void
    resetStatus: () => void
    swapTx: any
    approveTx: any
    swapError?: Error
    isLoading?: boolean
    showFormApproveModal: boolean
    setShowFormApproveModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function useSwap():UseSwapProps {
    const { walletAddress, currentNetworkId, currentChainId, chainName, isWeb3Enabled, isAuthenticated, currentChainShortName, currentNetwork } = useDapp()

    const { sendTransaction: sendApproveTransaction , state: approveTx } = useSendTransaction({ transactionName: 'approve' })
    const { sendTransaction: sendSwapTransaction , state: swapTx } = useSendTransaction({ transactionName: 'swap' })

    const [showFormApproveModal, setShowFormApproveModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [swapError, setSwapError] = useState<Error | null>(null)

    const handleSwap = async (values: SwapProps) => {
        setIsLoading(true)

        try {
            if (!values.tradeContext.hasEnoughAllowance && values.tradeContext.approvalTransaction) {
                const approved = await sendApproveTransaction(values.tradeContext.approvalTransaction)
            }
            if (values.tradeContext.transaction) {
                const transaction = values.tradeContext.transaction
                const approved = await sendSwapTransaction(transaction)
            }
        } catch {

        }
        setIsLoading(false)
    }

    const fetchAvailableTokens = async () => {
        // Get all tokens

        const result = await Moralis.Plugins.oneInch.getSupportedTokens({
            chain: currentNetwork.chainName.toLowerCase(), // The blockchain you want to use (eth/bsc/polygon)
        });

        let tokens = result.tokens

        tokens = Object.keys(tokens).map((k) => tokens[k])

        const nextTokens = tokens.filter(f =>
            swapTokens.some(k => f.symbol === k.symbol)
        )

        console.log(nextTokens, 'yo')


        return result.tokens
    }

    const getQuote = async() => {

        console.log(swapTokens[0])

        const quote = await Moralis.Plugins.oneInch.quote({
            chain: currentNetwork.chainName.toLowerCase(), // The blockchain you want to use (eth/bsc/polygon)
            fromTokenAddress: swapTokens[0].chainAddresses[currentNetworkId], // The token you want to swap
            toTokenAddress: swapTokens[1].chainAddresses[currentNetworkId], // The token you want to receive
            amount: '1000',
        });
        console.log(quote, 'bla');
    }

    useEffect(() => {
        const fetchTokens = async () => {
            if (isWeb3Enabled && isAuthenticated) {
                await getQuote()
            }
        }
        fetchTokens()
    }, [currentNetworkId, isAuthenticated])


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
