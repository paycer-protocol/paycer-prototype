import { useEthers } from '@usedapp/core'
import { INetworkProvider } from '../providers'

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
            chainId: provider?.chainId
        }])
    }

    return {
        switchNetwork,
        addNetwork,
        chainId
    }
}
