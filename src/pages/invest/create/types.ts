export enum RiskLevel {
  Low = 0,
  Medium = 1,
  High = 2,
}

export interface InvestmentDistributionProps {
  riskLevel: RiskLevel
  investName: string
  investSymbol: string
  investRange: number
}

export interface CreateInvestProps {
  investAmount: number
  investSymbol: string
  walletBalance: number
  walletSymbol: string
  riskLevel: RiskLevel
  investRange: number
  investmentDistribution: InvestmentDistributionProps[]
}
