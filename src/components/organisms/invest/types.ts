import {InvestPairType, FeesType, RewardType, InterestType, AssetType, StrategyType} from '../../../types/investment'

export interface InvestFormFields extends InvestPairType, FeesType, RewardType, InterestType {
    investRange: number
    submitAction: 'invest' | 'withdraw'
    assets?: AssetType[]
}

export interface InvestListProps {
    strategies: StrategyType[]
    search?: string
}
