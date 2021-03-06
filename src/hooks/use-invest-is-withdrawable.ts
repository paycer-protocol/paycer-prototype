import {useEffect, useState} from 'react'
import { ChainId } from '@usedapp/core'
import { formatUnits } from '@ethersproject/units'
import InvestAbi from '../deployments/Invest.json'
import { useDapp } from '@context/dapp-context'
import { StrategyType } from '../types/investment'
import Moralis from "moralis";

interface UseInvestIsWithdrawAbleProps {
    isWithdrawAble: boolean
    setIsWithdrawAble: React.Dispatch<React.SetStateAction<boolean>>
}

export default function useInvestIsWithdrawable(strategy: StrategyType):UseInvestIsWithdrawAbleProps {
    const { currentNetworkId, walletAddress, isInitialized, currentNetwork } = useDapp()
    const strategyAddress = strategy.chainAddresses[currentNetworkId] || strategy.chainAddresses[ChainId.Polygon]
    const [balanceOf, setBalanceOf] = useState<number>(0)
    const [isWithdrawAble, setIsWithdrawAble] = useState<boolean>(false)

    const fetchBalanceOf = () => {
        if (walletAddress && isInitialized) {
            const fetch = async () => {
                const options = {
                    chain: currentNetwork.chainName.toLowerCase(),
                    address: strategyAddress,
                    function_name: 'balanceOf',
                    abi: InvestAbi,
                    params: {account: walletAddress},
                }
                try {
                    // @ts-ignore
                    const response = await Moralis.Web3API.native.runContractFunction(options)
                    if (response) {
                        setBalanceOf(Number(formatUnits(response, 18)))

                    }
                } catch (e) {
                    console.log('balanceOf', e)
                }
            }
            fetch()
        } else {
            setBalanceOf(0)
        }
    }

    useEffect(() => {
        fetchBalanceOf()
    }, [currentNetworkId, isInitialized, walletAddress])

    useEffect(() => {
        setIsWithdrawAble(balanceOf > strategy.minWithdraw)
    }, [balanceOf])

    return {
        isWithdrawAble,
        setIsWithdrawAble
    }
}
