export interface StakingProps {
  rewardSymbol: string
  stakedBalance: number
  unstakedBalance: number
  claimBalance: number
  rewardRate: number
  stakeRange: number
  depositFee: number
  withdrawFee: number
  disabled: boolean
}
