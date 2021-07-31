import { InvestPairType, FeesType, RewardType, InterestType, AssetType } from '../../../types/investment'

export interface InvestFormFields extends InvestPairType, FeesType, RewardType, InterestType {
    investRange: number
    submitAction: 'invest' | 'withdraw'
    assets?: AssetType[]
}
