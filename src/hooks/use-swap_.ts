import { useSendTransaction } from '@usedapp/core'
import Moralis from "moralis";
import {useEffect, useState} from 'react'
import {FormikValues} from "formik";
import { TokenType } from '../types/investment'
import {useDapp} from "@context/dapp-context";
import {swapTokens} from '@config/market-pairs'
import {useMoralisWeb3Api} from "react-moralis";
import {BigNumber} from "@ethersproject/bignumber";
import {formatUnits} from "@ethersproject/units";
import {formatLastRewardtime} from "../helpers/staking-helper";

enum TRANSACTION_STATE {
    "NONE" = 0,
    "APPROVE" = 1,
    "TRANSACTION" = 2
}

interface HandleSwapProps {
    amount: string
    fromToken:TokenType
    toToken:TokenType
    slippage: number
}

interface FetchQuoteProps {
    amount: string
    fromToken:TokenType
    toToken:TokenType
}

interface UseSwapProps {
    transactionState: TRANSACTION_STATE
    contractCallError: Error
    handleSwap: (props: HandleSwapProps) => Promise<void>
    fetchQuote: (props: FetchQuoteProps) => Promise<number>
    isLoading: boolean
    showFormApproveModal: boolean
    setShowFormApproveModal: React.Dispatch<React.SetStateAction<boolean>>
    swapIsSuccess: boolean
    resetStatus: () => void
}

export default function useSwap():UseSwapProps {
    const { walletAddress, currentNetworkId, currentChainId, chainName, isWeb3Enabled, isAuthenticated, currentNetwork } = useDapp()
    const [showFormApproveModal, setShowFormApproveModal] = useState(false)
    const [swapIsSuccess, setSwapIsSuccess] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [transactionState, setTransactionState] = useState<TRANSACTION_STATE>(0)
    const [contractCallError, setContractCallError] = useState<Error | null>(null)

    const handleSwap = async (props: HandleSwapProps) => {

        if (!Moralis?.['Plugins']?.['oneInch']) {
            return null
        }

        setIsLoading(true)

        const {
            fromToken,
            toToken,
            slippage,
            amount
        } = props

        try {
            const receipt = await Moralis.Plugins.oneInch.swap({
                chain: currentNetwork.chainName.toLowerCase(), // The blockchain you want to use (eth/bsc/polygon)
                fromTokenAddress: fromToken.chainAddresses[currentNetworkId], // The token you want to swap
                toTokenAddress: toToken.chainAddresses[currentNetworkId], // The token you want to receive
                amount: amount,
                fromAddress: walletAddress, // Your wallet address
                slippage: slippage.toString()
            })
        } catch (e) {
            console.log(e.message)
            setIsLoading(false)
        }
        setIsLoading(false)

    }


    const fetchQuote = async(props: FetchQuoteProps) => {

        if (!Moralis?.['Plugins']?.['oneInch']) {
            return null
        }

        setIsLoading(true)

        const { fromToken, toToken, amount } = props

        const options = {
            chain: currentNetwork.chainName.toLowerCase(), // The blockchain you want to use (eth/bsc/polygon)
            fromTokenAddress: fromToken.chainAddresses[currentNetworkId], // The token you want to swap
            toTokenAddress: toToken.chainAddresses[currentNetworkId], // The token you want to receive
            amount: Moralis.Units.Token(amount, fromToken.decimals).toString(),
        }

        try {
            const quote = await Moralis.Plugins.oneInch.quote(options);
            if (quote) {
                return quote
            }
            setIsLoading(false)
        } catch (e) {
            console.log(e.message)
        }
        setIsLoading(false)
        return null
    }

    const fetchAllowance = async(fromTokenAddress: string, toTokenAddress: string) => {

        setIsLoading(true)

        const options = {
            chain: currentNetwork.chainName.toLowerCase(), // The blockchain you want to use (eth/bsc/polygon)
            fromTokenAddress: swapTokens[0].chainAddresses[currentNetworkId], // The token you want to swap
            toTokenAddress: walletAddress, // The token you want to receive
            amount: '1',
        }

        try {
            const allowance = await Moralis.Plugins.oneInch.hasAllowance(options)
            console.log(allowance);
        } catch (e) {
            setIsLoading(false)
            console.log(e, 'ferror')
        }

        setIsLoading(false)
    }

    /*
    useEffect(() => {
        const fetchTokens = async () => {
            await fetchQuote(swapTokens[1].chainAddresses[currentNetworkId], swapTokens[0].chainAddresses[currentNetworkId])
        }
        if (isAuthenticated && walletAddress) {
            fetchTokens()
        }


    }, [isAuthenticated, walletAddress])

     */

    const resetStatus = () => {
        setSwapIsSuccess(false)
        setContractCallError(null)
        setIsLoading(false)
        setTransactionState(0)
    }

    return {
        swapIsSuccess,
        contractCallError,
        showFormApproveModal,
        setShowFormApproveModal,
        isLoading,
        resetStatus,
        transactionState,
        handleSwap,
        fetchQuote
    }
}
