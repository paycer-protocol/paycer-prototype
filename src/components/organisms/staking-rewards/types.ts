export interface StakingProps {
  rewardSymbol: string
  stakedBalance: number
  tokenBalanceAfter: number
  rewardRate: number
  stakeRange: number
  depositFee: number
  withdrawFee: number
  disabled: boolean
}
