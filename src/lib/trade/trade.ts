import {
  TradeInterface,
  TradePairInterface,
  TradeProviderInterface,
  TradeSettingsInterface,
  NetworkSettingsInterface
} from './interfaces'

export class Trade implements TradeInterface  {
  tradePair: TradePairInterface;
  tradeProvider: TradeProviderInterface;
  tradeSettings: TradeSettingsInterface;
  networkSettings: NetworkSettingsInterface;

  constructor(tradeProvider: TradeProviderInterface) {
    this.tradeProvider = tradeProvider
  }

  public async init(
    pair: TradePairInterface,
    tradeSettings: TradeSettingsInterface,
    networkSettings: NetworkSettingsInterface): Promise<any> {
    return this.tradeProvider.init(
      pair,
      tradeSettings,
      networkSettings
    )
  }

  public async approve(): Promise<any> {
    return this.tradeProvider.approve()
  }

  public async trade(): Promise<any> {
    return this.tradeProvider.trade()
  }


}
