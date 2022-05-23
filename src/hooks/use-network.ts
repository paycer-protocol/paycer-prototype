import { useNetwork as useBaseNetwork } from '@usedapp/core'
import { mainNetProviders, INetworkProvider } from '../providers'
import { supportedChains, supportedStakingChains } from '@config/network'
import {useDapp} from "@context/dapp-context";

export default function useNetwork() {
    const { network } = useBaseNetwork()
    const { currentChainId } = useDapp()
    const currentNetwork = mainNetProviders[currentChainId]

    const supportedChain = supportedChains.includes(currentChainId)
    const supportedStakingChain = supportedStakingChains.includes(currentChainId)

    return {
        ...currentNetwork,
        ...{
            supportedChain,
            supportedStakingChain,
            chainId: currentChainId,
            provider: network.provider
        }
    }
}
