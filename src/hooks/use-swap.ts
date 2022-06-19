import Moralis from "moralis";
import {useState} from 'react'
import { TokenType } from '../types/investment'
import {useDapp} from "@context/dapp-context"
import {swapTokens} from '@config/market-pairs'

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

interface FetchQuoteResult {
    toTokenAmount: number
    estimatedGas: number
}

interface UseSwapProps {
    contractCallError: Error
    handleSwap: (props: HandleSwapProps) => Promise<void>
    fetchQuote: (props: FetchQuoteProps) => Promise<FetchQuoteResult>
    showFormApproveModal: boolean
    setShowFormApproveModal: React.Dispatch<React.SetStateAction<boolean>>
    swapIsSuccess: boolean
    resetStatus: () => void
}

export default function useSwap():UseSwapProps {
    const { walletAddress, currentNetworkId, currentChainId, chainName, isWeb3Enabled, isAuthenticated, currentNetwork } = useDapp()
    const [showFormApproveModal, setShowFormApproveModal] = useState(false)
    const [swapIsSuccess, setSwapIsSuccess] = useState<boolean>(false)
    const [contractCallError, setContractCallError] = useState<Error | null>(null)

    const handleSwap = async (props: HandleSwapProps) => {

        if (!Moralis?.['Plugins']?.['oneInch']) {
            return null
        }

        const {
            fromToken,
            toToken,
            slippage,
            amount
        } = props

        const hasAllowance = await fetchHasAllowance(props)

        if (!hasAllowance) {
            await handleApprove(props)
        }

        try {
            await Moralis.Plugins.oneInch.swap({
                chain: currentNetwork.chainName.toLowerCase(),
                fromTokenAddress: fromToken.chainAddresses[currentNetworkId].toLowerCase(),
                toTokenAddress: toToken.chainAddresses[currentNetworkId].toLowerCase(),
                amount: Moralis.Units.Token(amount, fromToken.decimals).toString(),
                fromAddress: walletAddress,
                slippage: slippage.toString()
            })
            setSwapIsSuccess(true)
        } catch (e) {
            console.log(e, e.message)
            setContractCallError(new Error('Something went wrong, please try again'))
        }
    }

    const fetchQuote = async(props: FetchQuoteProps) => {

        if (!Moralis?.['Plugins']?.['oneInch']) {
            return null
        }

        const { fromToken, toToken, amount } = props

        const options = {
            chain: currentNetwork.chainName.toLowerCase(),
            fromTokenAddress: fromToken.chainAddresses[currentNetworkId].toLowerCase(),
            toTokenAddress: toToken.chainAddresses[currentNetworkId].toLowerCase(),
            amount: Moralis.Units.Token(amount, fromToken.decimals).toString(),
        }

        const quote = await Moralis.Plugins.oneInch.quote(options)
        if (quote) {
            return quote
        }

        return null
    }

    const handleApprove = async(props: HandleSwapProps) => {

        const {
            fromToken,
        } = props

        try {
            await Moralis.Plugins.oneInch.approve({
                chain: currentNetwork.chainName.toLowerCase(),
                tokenAddress: fromToken.chainAddresses[currentNetworkId].toLowerCase(),
                fromAddress: walletAddress
            })
        } catch(e) {
            console.log(e.message)
        }
    }

    const fetchHasAllowance = async (props: HandleSwapProps) => {
        const {
            fromToken,
            amount
        } = props

        try {

            const options = {
                chain: currentNetwork.chainName.toLowerCase(),
                fromTokenAddress: fromToken.chainAddresses[currentNetworkId].toLowerCase(),
                fromAddress: walletAddress,
                amount: Moralis.Units.Token(amount, fromToken.decimals).toString(),
            }

            const allowance = await Moralis.Plugins.oneInch.hasAllowance(options)

            return allowance

        } catch(e) {
            console.log(e)
        }
    }

    const resetStatus = () => {
        setSwapIsSuccess(false)
        setContractCallError(null)
    }

    return {
        swapIsSuccess,
        contractCallError,
        showFormApproveModal,
        setShowFormApproveModal,
        resetStatus,
        handleSwap,
        fetchQuote
    }
}
