import { mainNetProviders, INetworkProvider } from '../providers'
import { supportedChains, supportedStakingChains } from '@config/network'
import { useChain } from 'react-moralis'

export default function useNetwork() {
    const { chain, switchNetwork } = useChain()

    const currentNetwork = mainNetProviders[chain?.networkId]
    const supportedChain = supportedChains.includes(chain?.networkId)
    const supportedStakingChain = supportedStakingChains.includes(chain?.networkId)

    const handleSwitchNetwork = async (chainId: string) => {
        await switchNetwork(chainId)
    }

    return {
        ...currentNetwork,
        ...{
            handleSwitchNetwork,
            supportedChain,
            supportedStakingChain,
            networkId: chain?.networkId,
        }
    }
}
