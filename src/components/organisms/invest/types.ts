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
    invested: number
    tvl: number
    assets: Asset[]
    investSymbol: string
    rewardSymbol: string
    walletSymbol: string
    setShowWalletProviderModal?: any // todo: remove ui indicator from data model
}

export interface InvestFormFields {
    investBalance: number
    walletBalance: number
    dailyInterest: number
    dailyRewards: number
    withdrawFee: number
    investFee: number
    investRange: number
    feeSymbol: string
    investSymbol: string
    rewardSymbol: string
    walletSymbol: string
    submitAction: 'invest' | 'withdraw'
}

