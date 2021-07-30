import {useEthers, useContractCall, ChainId} from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import * as PaycerTokenConfig from '../config/paycer-token'
import loyaltyProgramAbi from '@contracts/abi/LoyaltyProgram.json'
import {contractProvider} from "@providers/contracts";
import { Interface } from '@ethersproject/abi'
import useToken from '@hooks/use-token'

export default function useLoyaltyTiers() {

  const { account, chainId } = useEthers()
  const contractAddress = contractProvider.LoyaltyTiers.chainAddresses[chainId || ChainId.Mainnet]
  const { tokenBalance } = useToken('PCR')

  const handleContractCall = (method: string, params = []): number => {
    const [result] = useContractCall(
        account && {
          abi: new Interface(loyaltyProgramAbi.abi),
          address: contractAddress,
          method: method,
          args: params,
        }
    ) ?? []

        console.log(tokenBalance())

      return BigNumber.isBigNumber(result) ? result.toNumber() : 0
  }

  return {
      getLoyaltyTierOf: (): number => handleContractCall('loyaltyTierOf', [account]),
      getBaseRewardRateOf: (): number => handleContractCall('baseRewardRateOf', [account]),
      getInterestRateOf: (): number => handleContractCall('interestRateOf', [account]),
      getDiscountRateOf: (): number => handleContractCall('discountRateOf', [account]),
      getVotingWeight: (): number => Number(Number((tokenBalance() / PaycerTokenConfig.totalSupply)).toFixed(8))
  }
}
