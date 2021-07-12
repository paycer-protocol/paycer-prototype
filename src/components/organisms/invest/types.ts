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
    rewardRate: number
    earnedReward: number
}


export interface RewardProps {
    interestRate: number
    earnedInterest: number
}

export interface InvestProps extends FeesProps, InterestProps, RewardProps {
    title: string
    hasInvested: boolean
    tvl: number
    invested: number
    assets: Asset[]
    investSymbol: string
    rewardSymbol: string
    setShowWalletProviderModal?: any
}
