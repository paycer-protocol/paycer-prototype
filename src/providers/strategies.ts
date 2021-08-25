import { tokenProvider } from '@providers/tokens'
import { paycerProvider } from '@providers/protocols'
import { IStrategyProvider, RiskLevel } from '../types/investment'

export const strategyProvider: IStrategyProvider = {
  USDCStable: {
    riskLevel: RiskLevel.Low,
    name: 'USDC',
    type: 'paycer',
    input: tokenProvider.USDC,
    output: paycerProvider.pUSDC,
    rewards: {
      rewardRate: 25,
      rewardSymbol: tokenProvider.PCR.symbol,
    },
    interest: {
      interestRate: 8,
      interestSymbol: tokenProvider.USDC.symbol,
    },
    fees: {
      investFee: 0.1,
      withdrawFee: 0.1,
      feeSymbol: tokenProvider.USDC.symbol,
    },
    assets: [
      {
        name: 'usdc',
        imgPath: '/assets/icons/usdc.svg',
        investRange: 30,
      },
    ],
    color: '#6808C0',
  },
  DAIStable: {
    riskLevel: RiskLevel.Medium,
    name: 'DAI',
    type: 'paycer',
    input: tokenProvider.DAI,
    output: paycerProvider.pDAI,
    rewards: {
      rewardRate: 25,
      rewardSymbol: tokenProvider.PCR.symbol,
    },
    interest: {
      interestRate: 12.5,
      interestSymbol: tokenProvider.DAI.symbol,
    },
    fees: {
      investFee: 0.1,
      withdrawFee: 0.1,
      feeSymbol: tokenProvider.DAI.symbol,
    },
    assets: [
      {
        name: 'usdt',
        imgPath: '/assets/token/svg/color/dai.svg',
        investRange: 20,
      },
    ],
    color: '#8D0EA2',
  },
  USDTStable: {
    riskLevel: RiskLevel.High,
    name: 'USDT',
    type: 'paycer',
    input: tokenProvider.USDT,
    output: paycerProvider.pUSDT,
    rewards: {
      rewardRate: 25,
      rewardSymbol: tokenProvider.PCR.symbol,
    },
    interest: {
      interestRate: 15.5,
      interestSymbol: tokenProvider.USDT.symbol,
    },
    fees: {
      investFee: 0.1,
      withdrawFee: 0.1,
      feeSymbol: tokenProvider.USDT.symbol,
    },
    assets: [
      {
        name: 'usdt',
        imgPath: '/assets/icons/usd.svg',
        investRange: 20,
      }
    ],
    color: '#3C01E3',
  },
}
