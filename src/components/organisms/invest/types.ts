export interface Asset {
    name: string
    imgPath: string
}

export interface FeesProps {
    investFee: number
    withdrawFee: number
    feeSymbol: string
}

export interface InterestProps {
    interestRate: number
    earnedInterest: number
    dailyInterest?: number
}


export interface RewardProps {
    rewardRate: number
    earnedReward: number
    rewardSymbol: string
    dailyRewards?: number
}

export interface InvestPairProps {
    baseSymbol: string
    basePriceUSD?: number
    basePriceETH?: number
    baseBalance?: number
    investSymbol: string
    investPriceUSD?: number
    investPriceETH?: number
    investBalance?: number
}

export interface InvestProps extends InvestPairProps, FeesProps, InterestProps, RewardProps {
    title: string
    hasInvested: boolean
    invested: number
    tvl: number
    assets: Asset[]
    setShowWalletProviderModal?: any // todo: remove ui indicator from data model
}

export interface InvestFormFields extends InvestPairProps, FeesProps, RewardProps, InterestProps {
    investRange: number
    submitAction: 'invest' | 'withdraw'
}

