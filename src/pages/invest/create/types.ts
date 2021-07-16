import { RiskLevel } from '@types/investment'

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
