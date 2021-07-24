import {boolean} from "yup";


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
  earnedInterest?: number
}


export interface RewardType {
  rewardRate: number
  rewardSymbol: string
  earnedReward?: number
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

export interface InvestmentStrategy extends InvestPairType, FeesType, InterestType, RewardType {
  riskLevel: RiskLevel
  strategyName: string
  strategyType?: string
  investSymbol: string
  investAmount?: number
  investRange?: number
  tvl?: number
  invested?: number
  assets: AssetType[]
  setShowWalletProviderModal?: (state: boolean) => void
}

export default {}

