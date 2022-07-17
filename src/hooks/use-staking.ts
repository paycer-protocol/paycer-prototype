import { useEffect, useState } from 'react'
import {BigNumber} from '@ethersproject/bignumber'
import ChainId from '@providers/chain-id'
import { formatUnits } from '@ethersproject/units'
import { useDapp } from '@context/dapp-context'
import Moralis from 'moralis'
import StakingContractProvider from '@providers/staking'

interface UseStakingProps {
  stakedBalance: number
}

type UserInfoRequest = {
  accRewardPerShare: BigNumber
  amount: BigNumber
  lastDepositedAt: BigNumber
  lastRewardTime: BigNumber
  rewardDebt: BigNumber
}

export default function useInvest():UseStakingProps {
  const { currentNetworkId, walletAddress, currentNetwork, isInitialized } = useDapp()
  const stakingAddress = StakingContractProvider[currentNetworkId] || StakingContractProvider[ChainId.Polygon]
  const [userInfo, setUserInfo] = useState<UserInfoRequest | null>(null)

  const fetchUserInfo = () => {
    if (isInitialized && walletAddress) {
      const fetch = async () => {
        const options = {
          chain: currentNetwork.chainName.toLowerCase(),
          address: stakingAddress,
          function_name: 'userInfo',
          abi: StakingContractProvider.abi,
          params: { beneficiary: walletAddress },
        }
        try {
          // @ts-ignore
          const response: UserInfoRequest = await Moralis.Web3API.native.runContractFunction(options)
          if (response) {
            setUserInfo(response)
          }
        } catch (e) {
          console.log('userInfo', e)
        }
      }
      fetch()
    } else {
      setUserInfo(null)
    }
  }

  useEffect(() => {
    fetchUserInfo()
  }, [walletAddress, currentNetworkId])

  return {
    stakedBalance: Number(formatUnits(userInfo?.amount || 0)),
  }
}
