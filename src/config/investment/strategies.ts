import { StrategyType } from '../../types/investment';
import { strategyProvider } from '../../providers/strategies';

export const investmentStrategies: StrategyType[] = [
  strategyProvider.USDCStable,
  strategyProvider.DAIStable,
  strategyProvider.USDTStable,
  strategyProvider.WBTCPool,
  strategyProvider.WETHPool,
];
