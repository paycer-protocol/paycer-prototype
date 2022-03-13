import { useCalls } from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import InvestAbi from '../deployments/Invest.json'
import { Contract } from '@ethersproject/contracts'
import useWallet from '@hooks/use-wallet'
import { StrategyType } from '../types/investment'
import { investmentStrategies } from '@config/investment/strategies'
import {formatUnits} from "@ethersproject/units";

interface UsePortfolioProps {
    qualifiedStrategies: PortfolioStrategy[]
    totalInvest: number
}

interface PortfolioStrategy extends StrategyType {
    balance?: number
    tvl?: number
}

export default function usePortfolio():UsePortfolioProps {

    const wallet = useWallet()
    const { chainId } = wallet

    function getBalanceOfAll(tokenAddresses: string[] | undefined): (BigNumber | undefined)[] {
        const calls = tokenAddresses?.map(address => ({
            contract: new Contract(address, InvestAbi),
            method: 'balanceOf',
            args: [wallet.address]
        })) ?? []
        // @ts-ignore
        const results = useCalls(calls) ?? []
        results.forEach((result, idx) => {
            if(result && result.error) {
                console.error(`Error encountered calling 'totalSupply' on ${calls[idx]?.contract.address}: ${result.error.message}`)
            }
        })
        return results.map(result => result?.value?.[0])
    }

    const strategyAdresses = []

    investmentStrategies.map((strategy) => {
        strategyAdresses.push(strategy.chainAddresses[chainId])
    })

    const balanceOfAll = getBalanceOfAll(strategyAdresses)

    const qualifiedStrategies = []
    let totalInvest = 0

    investmentStrategies.map((strategy, key) => {
        const tokenBalance =   BigNumber.isBigNumber(balanceOfAll[key]) ? Number(formatUnits(balanceOfAll[key], strategy.decimals)) : 0
        totalInvest += tokenBalance
        if (tokenBalance > 0) {
            qualifiedStrategies.push({
                ...strategy,
                ...{
                    balance: tokenBalance,
                    color: strategy.color
                }
            } as PortfolioStrategy)
        }
    })

    return {
        qualifiedStrategies,
        totalInvest
    }
}
