export interface InvestFormFields {
    investBalance: number;
    walletBalance: number;
    investRange: number;
    investFee: number;
    dailyInterests: number,
    dailyRewards: number,
    submitAction: 'invest' | 'withdraw'
}
