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
    investRange: 30,
    color: '#2775CA',
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
    }
  },
  DAIStable: {
    riskLevel: RiskLevel.Medium,
    name: 'DAI',
    type: 'paycer',
    input: tokenProvider.DAI,
    output: paycerProvider.pDAI,
    investRange: 20,
    color: '#B47208',
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
    }
  },
  USDTStable: {
    riskLevel: RiskLevel.High,
    name: 'USDT',
    type: 'paycer',
    input: tokenProvider.USDT,
    output: paycerProvider.pUSDT,
    investRange: 20,
    color: '#0ecc8d',
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
    }
  },
  WBTCPool: {
    riskLevel: RiskLevel.High,
    name: 'wBTC',
    type: 'paycer',
    input: tokenProvider.wBTC,
    output: paycerProvider.pwBTC,
    investRange: 20,
    color: '#f2a900',
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
    }
  },
  WETHPool: {
    riskLevel: RiskLevel.High,
    name: 'wETH',
    type: 'paycer',
    input: tokenProvider.wETH,
    output: paycerProvider.pwETH,
    investRange: 20,
    color: '#ecf0f1',
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
    }
  },
  BUSDstable: {
    riskLevel: RiskLevel.Low,
    name: 'BUSD',
    type: 'paycer',
    input: tokenProvider.BUSD,
    output: paycerProvider.pBUSD,
    investRange: 20,
    color: '#F5D178',
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
    }
  },
}
