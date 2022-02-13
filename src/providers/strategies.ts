import { tokenProvider } from '@providers/tokens'
import { paycerProvider } from '@providers/protocols'
import { IStrategyProvider, RiskLevel } from '../types/investment'
import {ChainId} from "@usedapp/core";

export const strategyProvider: IStrategyProvider = {
  USDCStable: {
    riskLevel: RiskLevel.Low,
    name: 'USDC',
    type: 'paycer',
    input: tokenProvider.USDC,
    output: paycerProvider.pUSDC,
    color: '#2775CA',
    rewards: {
      rewardRate: 5,
      rewardSymbol: tokenProvider.PCR.symbol,
    },
    interest: {
      interestRate: 7,
      interestSymbol: tokenProvider.USDC.symbol,
    },
    fees: {
      investFee: 0.1,
      withdrawFee: 0.1,
      feeSymbol: tokenProvider.USDC.symbol,
    },
    chainAddresses: {
      [ChainId.Mainnet]: '09309932',
      [ChainId.Polygon]: '09309932',
      [ChainId.Kovan]: '0xAaD7328bCC81AC7D8ae9187d7F10B503E3d38Eb8'
    }
  },
  DAIStable: {
    riskLevel: RiskLevel.Medium,
    name: 'DAI',
    type: 'paycer',
    input: tokenProvider.DAI,
    output: paycerProvider.pDAI,
    color: '#B47208',
    rewards: {
      rewardRate: 5,
      rewardSymbol: tokenProvider.PCR.symbol,
    },
    interest: {
      interestRate: 8,
      interestSymbol: tokenProvider.DAI.symbol,
    },
    fees: {
      investFee: 0.1,
      withdrawFee: 0.1,
      feeSymbol: tokenProvider.DAI.symbol,
    },
    chainAddresses: {
      [ChainId.Mainnet]: '09309932',
      [ChainId.Polygon]: '09309932'
    }
  },
  USDTStable: {
    riskLevel: RiskLevel.High,
    name: 'USDT',
    type: 'paycer',
    input: tokenProvider.USDT,
    output: paycerProvider.pUSDT,
    color: '#0ecc8d',
    rewards: {
      rewardRate: 5,
      rewardSymbol: tokenProvider.PCR.symbol,
    },
    interest: {
      interestRate: 6,
      interestSymbol: tokenProvider.USDT.symbol,
    },
    fees: {
      investFee: 0.1,
      withdrawFee: 0.1,
      feeSymbol: tokenProvider.USDT.symbol,
    },
    chainAddresses: {
      [ChainId.Mainnet]: '09309932',
      [ChainId.Polygon]: '09309932'
    }
  },
  WBTCPool: {
    riskLevel: RiskLevel.High,
    name: 'wBTC',
    type: 'paycer',
    input: tokenProvider.wBTC,
    output: paycerProvider.pwBTC,
    color: '#f2a900',
    rewards: {
      rewardRate: 5,
      rewardSymbol: tokenProvider.PCR.symbol,
    },
    interest: {
      interestRate: 5,
      interestSymbol: tokenProvider.wBTC.symbol,
    },
    fees: {
      investFee: 0.1,
      withdrawFee: 0.1,
      feeSymbol: tokenProvider.wBTC.symbol,
    },
    chainAddresses: {
      [ChainId.Mainnet]: '09309932',
      [ChainId.Polygon]: '09309932'
    }
  },
  WETHPool: {
    riskLevel: RiskLevel.High,
    name: 'wETH',
    type: 'paycer',
    input: tokenProvider.wETH,
    output: paycerProvider.pwETH,
    color: '#ecf0f1',
    rewards: {
      rewardRate: 5,
      rewardSymbol: tokenProvider.PCR.symbol,
    },
    interest: {
      interestRate: 10,
      interestSymbol: tokenProvider.wETH.symbol,
    },
    fees: {
      investFee: 0.1,
      withdrawFee: 0.1,
      feeSymbol: tokenProvider.wETH.symbol,
    },
    chainAddresses: {
      [ChainId.Mainnet]: '09309932',
      [ChainId.Polygon]: '09309932'
    }
  },
  BUSDstable: {
    riskLevel: RiskLevel.Low,
    name: 'BUSD',
    type: 'paycer',
    input: tokenProvider.BUSD,
    output: paycerProvider.pBUSD,
    color: '#F5D178',
    rewards: {
      rewardRate: 5,
      rewardSymbol: tokenProvider.PCR.symbol,
    },
    interest: {
      interestRate: 6,
      interestSymbol: tokenProvider.BUSD.symbol,
    },
    fees: {
      investFee: 0.1,
      withdrawFee: 0.1,
      feeSymbol: tokenProvider.BUSD.symbol,
    },
    chainAddresses: {
      [ChainId.Mainnet]: '09309932',
      [ChainId.Polygon]: '09309932'
    }
  },
}
