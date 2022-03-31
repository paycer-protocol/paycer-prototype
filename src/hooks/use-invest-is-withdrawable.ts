import {useContractCall} from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import { ChainId } from '@usedapp/core'
import { formatUnits } from '@ethersproject/units'
import InvestAbi from '../deployments/Invest.json'
import useWallet from '@hooks/use-wallet'
import { StrategyType } from '../types/investment'
import {Interface} from '@ethersproject/abi'

interface UseVestingProps {
    isWithdrawAble: boolean
    withdrawAble: number
}

export default function useInvestIsWithdrawable(strategy: StrategyType):UseVestingProps {
    const wallet = useWallet()
    const { chainId } = wallet
    const strategyAddress = strategy.chainAddresses[chainId] || strategy.chainAddresses[ChainId.Polygon]

    const getContractValue = (method: string) => {
        const balanceOfArgs:any = wallet.isConnected ? {
            abi: new Interface(InvestAbi),
            address: strategyAddress,
            method: method,
            args: [wallet.address],
        } : false
        let [data] = useContractCall(balanceOfArgs) ?? []
        return BigNumber.isBigNumber(data) ? Number(formatUnits(data, 18)) : 0
    }

    const withdrawAble = getContractValue('balanceOf')

    console.log(withdrawAble)

    return {
        isWithdrawAble: withdrawAble > strategy.minWithdraw,
        withdrawAble
    }
}
