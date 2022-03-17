import { JsonRpcProvider } from '@ethersproject/providers'
import { ChainId } from '@usedapp/core'
import { TradeContext as BaseTradeContext } from './sdk/uniswap'

export interface TradeProviderInterface {
  init: (pair: TradePairInterface, tradeSettings: TradeSettingsInterface, networkSettings: NetworkSettingsInterface) => any
  approve: () => any
  trade: () => any
}

export interface NetworkSettingsInterface {
  providerUrl: string
  walletAddress: string
  networkProvider: JsonRpcProvider
  chainId: ChainId
  nameNetwork: string,
  multicallContractAddress: string,
  nativeCurrency: {
    name: string,
    symbol: string
  },
  nativeWrappedTokenInfo: {
    chainId: ChainId
    contractAddress: string
    decimals: number
    symbol: string
    name: string
  }
}

export interface TradeSettingsInterface {
  slippage: number
  deadlineMinutes: number
  disableMultihops: boolean
}

export interface TradePairInterface {
  fromTokenAddress: string
  toTokenAddress: string
  amount: string
}

export interface TradeInterface {
  tradeProvider: TradeProviderInterface
  tradePair: TradePairInterface
  tradeSettings: TradeSettingsInterface
  networkSettings: NetworkSettingsInterface
}

export interface TradeContext extends BaseTradeContext {}
