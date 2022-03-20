import {
  TradeProviderInterface,
  TradePairInterface,
  TradeSettingsInterface,
  NetworkSettingsInterface,
  TradeContext
} from './../interfaces'

import {
  UniswapPair,
  UniswapPairFactory,
  UniswapPairSettings,
  UniswapVersion,
} from '../sdk/uniswap'

// https://github.com/uniswap-integration/simple-uniswap-sdk
// multicall https://github.com/joshstevens19/ethereum-multicall

export class UniswapProvider implements TradeProviderInterface {
  factory: UniswapPairFactory

  tradeContext: TradeContext

  public async init (
    pair: TradePairInterface,
    tradeSettings: TradeSettingsInterface,
    networkSettings: NetworkSettingsInterface
  ): Promise<TradeContext> {
    const uniswapPair = new UniswapPair({
      fromTokenContractAddress: pair.fromTokenAddress,
      toTokenContractAddress: pair.toTokenAddress,
      providerUrl: networkSettings.providerUrl,
      ethereumAddress: networkSettings.walletAddress,
      ethereumProvider: networkSettings.networkProvider,
      chainId: networkSettings.chainId,
      settings: new UniswapPairSettings({
        /**
         * if not supplied it will use `0.005` which is 0.5%
         * please pass it in as a full number decimal so 0.7%
         * would be 0.007
         */
        slippage: tradeSettings.slippage / 100,
        /**
         * if not supplied it will use 20 a deadline minutes
         */
        deadlineMinutes: tradeSettings.deadlineMinutes,
        /**
         * if not supplied it will try to use multihops
         * if this is true it will require swaps to direct
         * pairs
         */
        disableMultihops: tradeSettings.disableMultihops,
        /**
         * for example if you only wanted to turn on quotes for v3 and not v3
         * you can only support the v3 enum same works if you only want v2 quotes
         * if you do not supply anything it query both v2 and v3
         */
        uniswapVersions: [UniswapVersion.v3],
        cloneUniswapContractDetails: {
          v2Override: {
            routerAddress: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
            factoryAddress: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
            pairAddress: "",
          },
          v3Override: {
            routerAddress: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
            factoryAddress: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
            quoterAddress: "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6"
          },
        },
        customNetwork: {
          nameNetwork: networkSettings.nameNetwork,
          multicallContractAddress: networkSettings.multicallContractAddress,
          nativeCurrency: networkSettings.nativeCurrency,
          nativeWrappedTokenInfo: networkSettings.nativeWrappedTokenInfo
        }
      })
    });

    this.factory = await uniswapPair.createFactory()

    this.tradeContext?.destroy()
    this.tradeContext = await this.factory.trade(pair.amount)

    return this.tradeContext
  }




  public approve(): any {

  }

  public trade(): any {
    if (this.tradeContext.transaction) {
      // const tradeTransaction = await wallet.sendTransaction(this.tradeContext.transaction);
      // console.log('trade txHash', tradeTransaction.hash);
      // const tradeReceipt = await tradeTransaction.wait();
      // console.log('trade receipt', tradeReceipt);

      // once done with trade aka they have sent it and you don't need it anymore call
      // this.tradeContext.destroy();
    }
  }
}
