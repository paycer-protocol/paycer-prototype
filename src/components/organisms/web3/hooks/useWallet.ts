import { useState, useEffect } from 'react'
import { useEtherBalance, useEthers, shortenIfAddress, CHAIN_NAMES } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import { UnsupportedChainIdError} from '@web3-react/core'
import { NoEthereumProviderError} from '@web3-react/injected-connector'
import { ChainSymbol, BlockchainExplorer } from '../providers'

export default function useWallet() {
    const { connector, active, activate, account, deactivate, chainId } = useEthers()
    const etherBalance = useEtherBalance(account)
    const [activatingConnector, setActivatingConnector] = useState(undefined)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined)
        }
    }, [activatingConnector, connector])

    const handleConnect = async (provider) => {
        try {
            const connector = provider.beforeConnect(provider)
            setErrorMessage(null)
            setActivatingConnector(connector)
            await activate(connector, undefined, true)
        } catch (e) {
            handleConnectError(provider, e)
        }
    }

    const handleConnectError = (provider, error: Error) => {
        let message

        if (error instanceof NoEthereumProviderError) {
            message = 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
        } else if (error instanceof UnsupportedChainIdError) {
            message = "You're connected to an unsupported network."
        } else if (provider.rejectedError && error instanceof provider.rejectedError) {
            message = 'Please authorize this website to access your Ethereum account.'
        } else {
            message = 'An unknown error occurred. Please try again.'
        }

        setActivatingConnector(undefined)
        setErrorMessage(message)
    }

    return {
        address: account,
        shortenAddress: shortenIfAddress(account),
        isActive: active,
        isConnected: !!account,
        connect: handleConnect,
        disconnect: () => deactivate(),
        etherBalance: formatEther(etherBalance || 0),
        etherSymbol: ChainSymbol[chainId] || ChainSymbol.default, // FIXME: chainId not changed on network switch
        chainName: CHAIN_NAMES[chainId] || '',
        explorerUrl: `${BlockchainExplorer[chainId] || ''}/address/${account}`,
        chainId,
        activatingConnector,
        errorMessage
    }
}
