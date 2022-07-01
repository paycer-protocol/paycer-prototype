import { tokenProvider } from '@providers/tokens';
import { paycerProvider } from '@providers/protocols';
import { ChainId } from '@usedapp/core';
import { IStrategyProvider, RiskLevel } from '../types/investment';

export const strategyProvider: IStrategyProvider = {
  USDCStable: {
    riskLevel: RiskLevel.Low,
    name: 'USDC',
    type: 'paycer',
    input: tokenProvider.USDC,
    output: paycerProvider.pUSDC,
    color: '#2775CA',
    decimals: 6,
    minWithdraw: 0.01,
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
      [ChainId.Polygon]: '0x007f4817dDacd820690303e21A9505AdF9ea32F8',
    },
  },
  DAIStable: {
    riskLevel: RiskLevel.Medium,
    name: 'DAI',
    type: 'paycer',
    input: tokenProvider.DAI,
    output: paycerProvider.pDAI,
    color: '#B47208',
    decimals: 18,
    minWithdraw: 0.01,
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
      [ChainId.Polygon]: '0xb667841138d226962fAB5b85907650BEA08A9733',
    },
  },
  USDTStable: {
    riskLevel: RiskLevel.High,
    name: 'USDT',
    type: 'paycer',
    input: tokenProvider.USDT,
    output: paycerProvider.pUSDT,
    color: '#0ecc8d',
    decimals: 6,
    minWithdraw: 0.01,
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
      [ChainId.Polygon]: '0xbB40e77Fd13DcF70CAF737a2AE74cAdE11219620',
    },
  },
  WBTCPool: {
    riskLevel: RiskLevel.High,
    name: 'wBTC',
    type: 'paycer',
    input: tokenProvider.wBTC,
    output: paycerProvider.pwBTC,
    color: '#f2a900',
    decimals: 8,
    minWithdraw: 0,
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
      [ChainId.Polygon]: '0xE99D420a0e36850F3C3876C0a06725102801dfeB',
    },
  },
  WETHPool: {
    riskLevel: RiskLevel.High,
    name: 'wETH',
    type: 'paycer',
    input: tokenProvider.wETH,
    output: paycerProvider.pwETH,
    color: '#ecf0f1',
    decimals: 18,
    minWithdraw: 0,
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
      [ChainId.Polygon]: '0x84f38466afFafC230c0273E5404087202c25F238',
    },
  },
};
