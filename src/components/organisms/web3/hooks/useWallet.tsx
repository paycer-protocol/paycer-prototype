import { useEtherBalance, useEthers, shortenIfAddress } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'

export default function useWallet() {
    const {
        active,
        activate,
        account,
        deactivate
    } = useEthers()

    const etherBalance = useEtherBalance(account)

    const handleConnect = async (provider) => {
        await activate(provider, undefined, true)
    }

    return {
        address: account,
        shortenAddress: shortenIfAddress(account),
        isActive: active,
        isConnected: !!account,
        connect: handleConnect,
        disconnect: () => deactivate(),
        etherBalance: formatEther(etherBalance || 0),
    }
}
