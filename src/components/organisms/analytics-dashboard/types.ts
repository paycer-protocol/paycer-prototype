export type InfoDashboardFormType = {
  selectedChains: Array<number>
}

export type TimeSectionStateType = '1M' | '3M' | '1Y'

export interface InfoChartProps {
  headline?: string
  tokenPrice: number | undefined
  isSmall?: boolean
  showTotalSumAsTitle?: boolean
  dataType: 'staking' | 'vesting' | 'holders' | 'dailyStaked' | 'dailyWithdrawn' | 'dailyHolders' | 'dailyVestingWithdrawn' | 'dailyTransactions'
  chartType: 'area' | 'bar'
  isModal?: boolean
  handleShowModal?: (InfoChartProps) => void
  handleHideModal?: () => void
}
