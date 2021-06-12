import { useEthers } from '@usedapp/core'
import { INetworkProvider } from '../providers'

export default function useNetwork() {
    const { account, library, chainId } = useEthers()

    // FIXME: rpc call throws an error in case of change to to eth network.
    const changeNetwork = (provider: INetworkProvider) => {
        library?.send('wallet_addEthereumChain', [
            provider,
            account,
        ])
    }

    return {
        changeNetwork,
        chainId
    }
}
