import { InvestmentStrategy, RiskLevel } from '@types/investment'

export const investmentStrategies: InvestmentStrategy[] = [
  {
    // InvestmentStrategy
    riskLevel: RiskLevel.Low,
    strategyName: 'BASIC',

    // InvestPairType
    baseSymbol: 'ETH',
    basePriceUSD: 1,
    basePriceETH: 1,
    investSymbol: 'USDC',
    investPriceUSD: 1,
    investPriceETH: 1,

    // FeesType
    investFee: 0.01,
    withdrawFee: 0.01,
    feeSymbol: 'USDC',

    // InterestType
    interestRate: 10,

    // RewardType
    rewardRate: 10,
    rewardSymbol: 'PCR',

    // AssetsType
    assets: [
      {
        name: 'usdt',
        imgPath: 'assets/icons/usd.svg',
        investRange: 20,
      },
      {
        name: 'usdc',
        imgPath: 'assets/icons/usdc.svg',
        investRange: 30,
      },
      {
        name: 'bnb',
        imgPath: 'assets/icons/busd.svg',
        investRange: 50,
      }
    ],
    tvl: 11298334,
    invested: 13123,
  },
  {
    // InvestmentStrategy
    riskLevel: RiskLevel.Medium,
    strategyName: 'ADVANCED',

    // InvestPairType
    baseSymbol: 'ETH',
    basePriceUSD: 1,
    basePriceETH: 1,
    investSymbol: 'USDC',
    investPriceUSD: 1,
    investPriceETH: 1,

    // FeesType
    investFee: 0.01,
    withdrawFee: 0.01,
    feeSymbol: 'USDC',

    // InterestType
    interestRate: 10,

    // RewardType
    rewardRate: 10,
    rewardSymbol: 'PCR',

    // AssetsType
    assets: [
      {
        name: 'usdt',
        imgPath: 'assets/icons/usd.svg',
        investRange: 20,
      },
      {
        name: 'usdc',
        imgPath: 'assets/icons/usdc.svg',
        investRange: 30,
      },
      {
        name: 'bnb',
        imgPath: 'assets/icons/busd.svg',
        investRange: 50,
      }
    ],
    tvl: 11298334,
    invested: 13123,
  },
  {
    // InvestmentStrategy
    riskLevel: RiskLevel.High,
    strategyName: 'EXPERT',

    // InvestPairType
    baseSymbol: 'ETH',
    basePriceUSD: 1,
    basePriceETH: 1,
    investSymbol: 'USDC',
    investPriceUSD: 1,
    investPriceETH: 1,

    // FeesType
    investFee: 0.01,
    withdrawFee: 0.01,
    feeSymbol: 'USDC',

    // InterestType
    interestRate: 10,

    // RewardType
    rewardRate: 10,
    rewardSymbol: 'PCR',

    // AssetsType
    assets: [
      {
        name: 'usdt',
        imgPath: 'assets/icons/usd.svg',
        investRange: 20,
      },
      {
        name: 'usdc',
        imgPath: 'assets/icons/usdc.svg',
        investRange: 30,
      },
      {
        name: 'bnb',
        imgPath: 'assets/icons/busd.svg',
        investRange: 50,
      }
    ],
    tvl: 11298334,
    invested: 13123,
  },
]
