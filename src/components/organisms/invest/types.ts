import { InvestPairType, FeesType, RewardType, InterestType } from '../../../types/investment'

export interface InvestFormFields extends InvestPairType, FeesType, RewardType, InterestType {
    investRange: number
    submitAction: 'invest' | 'withdraw'
}

