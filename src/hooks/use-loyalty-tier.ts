import LoyaltyTiers from '@config/loyalty-tiers'
import useStaking from '@hooks/use-staking'

interface LoyaltyTierProps {
  tierLevel: {
    label: string
    value: number
  }
}

export default function useLoyaltyTier():LoyaltyTierProps {
  const { stakedBalance } = useStaking()
  // maybe later add the wallet balance
  const balance = stakedBalance

  const getTierLevel = () => {
    let tierLevel = 0;
    LoyaltyTiers.forEach((v, i) => {
      //@ts-ignore
      if (balance >= v.value) {
        tierLevel = i
      }
    })
    return LoyaltyTiers[tierLevel]
  }

  const tierLevel = getTierLevel()

  return {
    //@ts-ignore
    tierLevel
  }
}
