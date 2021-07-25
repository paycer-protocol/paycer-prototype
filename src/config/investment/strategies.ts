import { InvestmentStrategy, RiskLevel } from '../../types/investment'

export const investmentStrategies: InvestmentStrategy[] = [
  {
    // InvestmentStrategy
    riskLevel: RiskLevel.Low,
    contractWalletAddress: '0x32332c5D36560C7f9d966D63f5F85705f36f4aAC',
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
    interestRate: 20,

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
    contractWalletAddress: '0xace34D4743C0c990eb053483E230853347EAc6ad',
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
        investRange: 50
      }
    ],
    tvl: 11298334,
    invested: 13123,
  },
  {
    // InvestmentStrategy
    riskLevel: RiskLevel.High,
    contractWalletAddress: '0xbabec4562e3F02bD5E37aDA1B726ff80fF2E6884',
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
    contractWalletAddress: '0x1987a4EdE4f8ECD03Db32714D48843e5da255959',
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
        name: 'bnb',
        imgPath: 'assets/icons/busd.svg',
        investRange: 50
      }
    ],
    tvl: 11298334,
    invested: 0,
  },
]
