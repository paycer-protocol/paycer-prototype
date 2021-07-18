export interface StakingProps {
  rewardSymbol: string
  stakedBalance: number | string
  tokenBalance: number | string
  rewardRate: number
  stakeRange: number
  depositFee: number
  withdrawFee: number
  disabled: boolean
}
