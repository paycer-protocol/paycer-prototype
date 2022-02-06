import {InvestPairType, FeesType, RewardType, InterestType, StrategyType} from '../../../types/investment'

export interface InvestFormFields extends InvestPairType, FeesType, RewardType, InterestType {
    investRange: number
    balance: number
}

export interface InvestListProps {
    strategies: StrategyType[]
    search?: string
}
