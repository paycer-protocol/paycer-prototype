import {useContractCall} from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import { ChainId } from '@usedapp/core'
import { formatUnits } from '@ethersproject/units'
import InvestAbi from '../deployments/Invest.json'
import { useWallet } from '@context/wallet-context'
import { StrategyType } from '../types/investment'
import {Interface} from '@ethersproject/abi'

interface UseVestingProps {
    isWithdrawAble: boolean
}

export default function useInvestIsWithdrawable(strategy: StrategyType):UseVestingProps {
    const {currentChainId, walletIsAuthenticated, walletAddress} = useWallet()
    const strategyAddress = strategy.chainAddresses[currentChainId] || strategy.chainAddresses[ChainId.Polygon]

    const getBalanceOf = () => {
        const balanceOfArgs:any = walletIsAuthenticated ? {
            abi: new Interface(InvestAbi),
            address: strategyAddress,
            method: 'balanceOf',
            args: [walletAddress],
        } : false
        let [data] = useContractCall(balanceOfArgs) ?? []
        return BigNumber.isBigNumber(data) ? Number(formatUnits(data, 18)) : 0
    }

    const withdrawAble = getBalanceOf()

    return {
        isWithdrawAble: withdrawAble > strategy.minWithdraw
    }
}
