import { useNetwork as useBaseNetwork } from '@usedapp/core'
import { mainNetProviders, INetworkProvider } from '../providers'
import { supportedChains, supportedStakingChains } from '@config/network'
import {useDapp} from "@context/dapp-context";

export default function useNetwork() {
    const { network } = useBaseNetwork()
    const { currentNetworkId } = useDapp()
    const currentNetwork = mainNetProviders[currentNetworkId]

    const supportedChain = supportedChains.includes(currentNetworkId)
    const supportedStakingChain = supportedStakingChains.includes(currentNetworkId)

    return {
        ...currentNetwork,
        ...{
            supportedChain,
            supportedStakingChain,
            chainId: currentNetworkId,
            provider: network.provider
        }
    }
}
