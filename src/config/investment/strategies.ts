import { StrategyType } from '../../types/investment'
import { strategyProvider } from '../../providers/strategies'

export const investmentStrategies: StrategyType[] = [
  strategyProvider.basic,
  strategyProvider.advanced,
  strategyProvider.expert,
  strategyProvider.expert,
]
