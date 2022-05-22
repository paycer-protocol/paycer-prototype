import {useEffect, useState} from 'react'
import { BigNumber } from '@ethersproject/bignumber'
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
    const { currentChainId, walletAddress } = useDapp()
    const strategyAddress = strategy.chainAddresses[currentChainId] || strategy.chainAddresses[ChainId.Polygon]
    const [balanceOf, setBalanceOf] = useState<number>(0)
    const [isWithdrawAble, setIsWithdrawAble] = useState<boolean>(false)

    const fetchBalanceOf = () => {
        if (walletAddress) {
            const fetch = async () => {
                const options = {
                    contractAddress: strategyAddress,
                    functionName: 'balanceOf',
                    abi: InvestAbi,
                    params: {account: walletAddress},
                }
                try {
                    // @ts-ignore
                    const response: BigNumber = await Moralis.executeFunction(options)
                    console.log(response, 'balanceOf')
                    if (response && BigNumber.isBigNumber(response)) {
                        setBalanceOf(Number(formatUnits(response, 18)))

                    }
                } catch (e) {
                    console.log('balanceOf', e)
                }
            }
            fetch()
        }
    }

    useEffect(() => {
        fetchBalanceOf()
    }, [])

    useEffect(() => {
        if (walletAddress && balanceOf) {
            setIsWithdrawAble(balanceOf > strategy.minWithdraw)
        }
    }, [balanceOf])

    return {
        isWithdrawAble,
        setIsWithdrawAble
    }
}
