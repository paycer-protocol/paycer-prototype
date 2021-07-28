import {useEthers, useContractCall, ChainId} from '@usedapp/core'
import loyaltyProgramAbi from '@contracts/abi/LoyaltyProgram.json'
import {contractProvider} from "@providers/contracts";
import { Interface } from '@ethersproject/abi'

export default function useLoyaltyTiers() {

  const { account, chainId } = useEthers()
  const contractAddress = contractProvider.LoyaltyTiers.chainAddresses[chainId || ChainId.Mainnet]

    console.log(contractAddress)

  const handleContractCall = (method: string, params = []): number => {
    const [result] = useContractCall(
        account && {
          abi: new Interface(loyaltyProgramAbi.abi),
          address: contractAddress,
          method: method,
          args: params,
        }
    ) ?? []


        console.log(result, 'HI')

    return result
  }

  return {
   loyaltyTierOf: (): number => handleContractCall('loyaltyTierOf', [account]),
  }
}
