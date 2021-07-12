export interface InvestFormFields {
    investBalance: number
    walletBalance: number
    investRange: number
    investFee: number
    depositFee: number
    dailyInterest: number
    dailyRewards: number
    investSymbol: string
    rewardSymbol: string
    submitAction: 'invest' | 'withdraw'
}
