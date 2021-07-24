import { InvestmentStrategy, RiskLevel } from '../../types/investment'

export const investmentStrategies: InvestmentStrategy[] = [
  {
    // InvestmentStrategy
    riskLevel: RiskLevel.Low,
    strategyName: 'Basic',
    strategyType: 'paycer',
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
        imgPath: 'assets/token/svg/color/usdt.svg',
        investRange: 20,
      },
      {
        name: 'usdc',
        imgPath: 'assets/token/svg/color/usdc.svg',
        investRange: 30,
      },
      {
        name: 'bnb',
        imgPath: 'assets/token/svg/color/bnb.svg',
        investRange: 50,
      }
    ],
    tvl: 11298334,
    invested: 13123,
  },
  {
    // InvestmentStrategy
    riskLevel: RiskLevel.Medium,
    strategyName: 'Advanced',
    strategyType: 'paycer',
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
        imgPath: 'assets/token/svg/color/usdt.svg',
        investRange: 15,
      },
      {
        name: 'usdc',
        imgPath: 'assets/token/svg/color/usdc.svg',
        investRange: 55,
      }
    ],
    tvl: 11298334,
    invested: 13123,
  },
  {
    // InvestmentStrategy
    riskLevel: RiskLevel.High,
    strategyName: 'Expert',
    strategyType: 'paycer',

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
        imgPath: 'assets/token/svg/color/usdt.svg',
        investRange: 40,
      },
      {
        name: 'usdc',
        imgPath: 'assets/token/svg/color/usdc.svg',
        investRange: 20,
      },
      {
        name: 'bnb',
        imgPath: 'assets/token/svg/color/bnb.svg',
        investRange: 40,
      }
    ],
    tvl: 11298334,
    invested: 13123,
  },
  {
    // InvestmentStrategy
    riskLevel: RiskLevel.High,
    strategyName: 'Lorem',
    strategyType: 'custom',

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
        imgPath: 'assets/token/svg/color/usdt.svg',
        investRange: 40,
      },
      {
        name: 'bnb',
        imgPath: 'assets/token/svg/color/bnb.svg',
        investRange: 40,
      }
    ],
    tvl: 11298334,
    invested: 0,
  },
]
