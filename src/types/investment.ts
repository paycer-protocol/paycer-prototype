export enum RiskLevel {
  Low = 0,
  Medium = 1,
  High = 2,
}

export interface AssetType {
  name: string
  imgPath: string
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
  investSymbol: string
  investRange?: number
  tvl?: number
  invested?: number
  assets: AssetType[]
}

