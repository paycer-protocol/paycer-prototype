import loyaltyTiers, { LoyaltyTier, stakingRequirements } from '@config/loyalty-tiers'
import useStaking from '@hooks/use-staking'

interface LoyaltyTierProps {
  tierLevel: LoyaltyTier;
}

export default function useLoyaltyTier():LoyaltyTierProps {
  const { stakedBalance } = useStaking()
  // maybe later add the wallet balance
  const balance = stakedBalance

  const getTierLevel = () => {
    let tierLevel = 0;
    loyaltyTiers.forEach((v, i) => {
      if (balance >= stakingRequirements[v].maximum) {
        tierLevel = i
      }
    })
    return loyaltyTiers[tierLevel]
  }

  const tierLevel = getTierLevel()

  return {
    tierLevel
  }
}
