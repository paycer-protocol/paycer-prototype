import { useEthers, useNetwork as useBaseNetwork } from '@usedapp/core'
import { mainNetProviders, INetworkProvider } from '../providers'
import { supportedChains, supportedStakingChains } from '@config/network'

export default function useNetwork() {
    const { network } = useBaseNetwork()
    const { account, library, chainId } = useEthers()
    const currentNetwork = mainNetProviders[chainId]

    const addNetwork = async (networkProvider: INetworkProvider) => {
        await library?.send('wallet_addEthereumChain', [
            networkProvider,
            account,
        ])
    }

    const switchNetwork = async (networkProvider: INetworkProvider) => {
        await library?.send('wallet_switchEthereumChain', [{
            // @ts-ignore
            chainId: networkProvider?.chainId
        }])
    }

    const supportedChain = supportedChains.includes(chainId)
    const supportedStakingChain = supportedStakingChains.includes(chainId)

    return {
        ...currentNetwork,
        ...{
            switchNetwork,
            addNetwork,
            supportedChain,
            supportedStakingChain,
            chainId,
            provider: network.provider
        }
    }
}
