import { InvestPairType, FeesType, RewardType, InterestType, AssetType } from '../../../types/investment'

// TODO not in use. Type moveed to /types/investments.ts
export interface InvestProps extends InvestPairType, FeesType, InterestType, RewardType {
    title: string
    hasInvested: boolean
    invested: number
    tvl: number
    assets: AssetType[]
    setShowWalletProviderModal?: any // todo: remove ui indicator from data model
}

export interface InvestFormFields extends InvestPairType, FeesType, RewardType, InterestType {
    investRange: number
    submitAction: 'invest' | 'withdraw'
}

