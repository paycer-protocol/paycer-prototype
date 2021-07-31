import { tokenProvider } from '@providers/tokens'
import { yVaultProvider, paycerProvider } from '@providers/protocols'
import { IStrategyProvider, RiskLevel } from '../types/investment'

export const strategyProvider: IStrategyProvider = {
  basic: {
    riskLevel: RiskLevel.Low,
    name: 'Basic',
    type: 'paycer',
    input: tokenProvider.USDC,
    output: yVaultProvider.yvUSDC,
    pool: paycerProvider.USDC,
    rewards: {
      rewardRate: 10,
      rewardSymbol: tokenProvider.PCR.symbol,
    },
    interest: {
      interestRate: 20,
      interestSymbol: tokenProvider.USDC.symbol,
    },
    fees: {
      investFee: 0.01,
      withdrawFee: 0.01,
      feeSymbol: tokenProvider.USDC.symbol,
    },
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
  },
  advanced: {
    riskLevel: RiskLevel.Medium,
    name: 'Advanced',
    type: 'paycer',
    input: tokenProvider.DAI,
    output: yVaultProvider.yvDAI,
    pool: paycerProvider.DAI,
    rewards: {
      rewardRate: 10,
      rewardSymbol: tokenProvider.PCR.symbol,
    },
    interest: {
      interestRate: 20,
      interestSymbol: tokenProvider.DAI.symbol,
    },
    fees: {
      investFee: 0.01,
      withdrawFee: 0.01,
      feeSymbol: tokenProvider.DAI.symbol,
    },
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
  },
  expert: {
    riskLevel: RiskLevel.High,
    name: 'Expert',
    type: 'paycer',
    input: tokenProvider.USDT,
    output: yVaultProvider.yvUSDT,
    pool: paycerProvider.USDT,
    rewards: {
      rewardRate: 10,
      rewardSymbol: tokenProvider.PCR.symbol,
    },
    interest: {
      interestRate: 20,
      interestSymbol: tokenProvider.USDT.symbol,
    },
    fees: {
      investFee: 0.01,
      withdrawFee: 0.01,
      feeSymbol: tokenProvider.USDT.symbol,
    },
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
  },
}
