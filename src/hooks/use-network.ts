import { useEthers } from '@usedapp/core'
import { INetworkProvider } from '../providers'
import { supportedChains, supportedStakingChains } from '@config/network'

export default function useNetwork() {
    const { account, library, chainId } = useEthers()

    const addNetwork = async (provider: INetworkProvider) => {
        await library?.send('wallet_addEthereumChain', [
            provider,
            account,
        ])
    }

    const switchNetwork = async (provider: INetworkProvider) => {
        await library?.send('wallet_switchEthereumChain', [{
            // @ts-ignore
            chainId: provider?.chainId
        }])
    }

    const supportedChain = supportedChains.includes(chainId)
    const supportedStakingChain = supportedStakingChains.includes(chainId)

    return {
        switchNetwork,
        addNetwork,
        supportedChain,
        supportedStakingChain,
        chainId
    }
}
