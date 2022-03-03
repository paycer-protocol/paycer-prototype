import { TokenType } from '../../../../types/investment'
import {
  TradeContext,
  TradePairInterface,
  TradeSettingsInterface,
  NetworkSettingsInterface
} from '../../../../lib/trade'

export interface SwapProps {
  token0: any
  token0Value: number
  token0Markets: TokenType[]

  token1: any
  token1Value: number
  token1Markets: TokenType[]

  tradePair: TradePairInterface
  tradeSettings: TradeSettingsInterface
  networkSettings: NetworkSettingsInterface
  tradeContext: TradeContext
  initFactory: (values: SwapProps) => any
}


