import { InvestPairType, FeesType, RewardType, InterestType } from '../../../types/investment'

export interface InvestFormFields extends InvestPairType, FeesType, RewardType, InterestType {
  amount?: number
  balance: number
  dailyInterest: number
  dailyRewards: number
  investRange: number
  fee: number
}
