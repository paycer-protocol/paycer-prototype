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
  WBTCPool: {
    riskLevel: RiskLevel.High,
    name: 'wBTC',
    type: 'paycer',
    input: tokenProvider.wBTC,
    output: paycerProvider.pwBTC,
    rewards: {
      rewardRate: 25,
      rewardSymbol: tokenProvider.PCR.symbol,
    },
    interest: {
      interestRate: 15.5,
      interestSymbol: tokenProvider.wBTC.symbol,
    },
    fees: {
      investFee: 0.1,
      withdrawFee: 0.1,
      feeSymbol: tokenProvider.wBTC.symbol,
    },
    assets: [
      {
        name: 'wbtc',
        imgPath: '/assets/icons/wbtc.svg',
        investRange: 20,
      }
    ],
    color: '#3C01E3',
  },
  WETHPool: {
    riskLevel: RiskLevel.High,
    name: 'wETH',
    type: 'paycer',
    input: tokenProvider.wETH,
    output: paycerProvider.pwETH,
    rewards: {
      rewardRate: 25,
      rewardSymbol: tokenProvider.PCR.symbol,
    },
    interest: {
      interestRate: 15.5,
      interestSymbol: tokenProvider.wETH.symbol,
    },
    fees: {
      investFee: 0.1,
      withdrawFee: 0.1,
      feeSymbol: tokenProvider.wETH.symbol,
    },
    assets: [
      {
        name: 'weth',
        imgPath: '/assets/icons/eth.svg',
        investRange: 20,
      }
    ],
    color: '#3C01E3',
  },
  BUSDstable: {
    riskLevel: RiskLevel.Low,
    name: 'BUSD',
    type: 'paycer',
    input: tokenProvider.BUSD,
    output: paycerProvider.pBUSD,
    rewards: {
      rewardRate: 25,
      rewardSymbol: tokenProvider.PCR.symbol,
    },
    interest: {
      interestRate: 15.5,
      interestSymbol: tokenProvider.BUSD.symbol,
    },
    fees: {
      investFee: 0.1,
      withdrawFee: 0.1,
      feeSymbol: tokenProvider.BUSD.symbol,
    },
    assets: [
      {
        name: 'busd',
        imgPath: '/assets/icons/busd.svg',
        investRange: 20,
      }
    ],
    color: '#3C01E3',
  },
}
