import { ChainId } from '@usedapp/core'

export enum RiskLevel {
  Low = 0,
  Medium = 1,
  High = 2,
}

export interface AssetType {
  name: string
  imgPath: string
  investRange: number
}

export interface FeesType {
  investFee: number
  withdrawFee: number
  feeSymbol: string
}

export interface InterestType {
  interestRate: number
  interestSymbol: string
}


export interface RewardType {
  rewardRate: number
  rewardSymbol: string
}

export interface InvestPairType {
  baseSymbol: string
  basePriceUSD?: number
  basePriceETH?: number
  baseBalance?: number
  investSymbol: string
  investPriceUSD?: number
  investPriceETH?: number
  investBalance?: number
}

export interface TokenType {
  symbol: string
  name: string
  decimals: number
  chainAddresses: {
    [ChainId.Mainnet]: string
    [ChainId.Kovan]: string
    [ChainId.Ropsten]?: string
    [ChainId.Rinkeby]?: string
    [ChainId.Goerli]?: string
    [ChainId.BSC]?: string
    [ChainId.xDai]?: string
    [ChainId.Polygon]?: string
    [ChainId.Mumbai]?: string
    [ChainId.Hardhat]?: string
  }
}

export interface StrategyType {
  name: string
  type?: string
  riskLevel: RiskLevel
  input: TokenType
  output: TokenType
  rewards: RewardType
  interest: InterestType
  fees: FeesType
  assets: AssetType[]
  color: string
}

export interface ITokenProvider {
  [symbol: string]: TokenType
}

export interface IStrategyProvider {
  [symbol: string]: StrategyType
}

export default {}

