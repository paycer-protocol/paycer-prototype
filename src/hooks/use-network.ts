import { INetworkProvider, mainNetProviders } from '../providers'
import { supportedChains, supportedStakingChains } from '@config/network'
import { useChain } from 'react-moralis'

export interface UseNetworkInterface {
    currentNetwork: INetworkProvider
    handleSwitchNetwork: (chainId: string) => Promise<void>
    currentChainIsSupportedForDApp: boolean
    currentChainIsSupportedForStaking: boolean
    currentChainId: number
    currentChainIdBinary: string
}

export default function useNetwork():UseNetworkInterface {
    const { chain, switchNetwork } = useChain()

    const currentNetwork = mainNetProviders[chain?.networkId]
    const currentChainIsSupportedForDApp = supportedChains.includes(chain?.networkId)
    const currentChainIsSupportedForStaking = supportedStakingChains.includes(chain?.networkId)

    const handleSwitchNetwork = async (chainId: string) => {
        await switchNetwork(chainId)
    }

    return {
        currentNetwork,
        handleSwitchNetwork,
        currentChainIsSupportedForDApp,
        currentChainIsSupportedForStaking,
        currentChainId: chain?.networkId,
        currentChainIdBinary: chain?.chainId
    }
}
