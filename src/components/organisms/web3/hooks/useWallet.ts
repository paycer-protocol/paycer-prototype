import { useEffect, useState } from 'react'
import { t } from '@lingui/macro'
import { CHAIN_NAMES, ChainId, getExplorerAddressLink, shortenIfAddress, useEtherBalance, useEthers } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import { NoEthereumProviderError } from '@web3-react/injected-connector'
import { Symbols, IConnectorProvider } from '../providers'

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

    const handleConnect = async (provider: IConnectorProvider) => {
        try {
            const nextConnector = provider.beforeConnect(provider)
            setErrorMessage(null)
            setActivatingConnector(nextConnector)
            await activate(nextConnector, undefined, true)
        } catch (e) {
            handleConnectError(provider, e)
        }
    }

    const handleConnectError = (provider, error: Error) => {
        let message

        if (error instanceof NoEthereumProviderError) {
            message = t`No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.`
        } else if (error.message.includes('Unsupported chain')) {
            message = t`You're connected to an unsupported network.`
        } else if (provider.rejectedError && error instanceof provider.rejectedError) {
            message = t`Please authorize this website to access your Ethereum account.`
        } else if (error.message.includes('already pending')) {
            message = t`Please open your wallet and connect your account.`
        } else {
            message = t`An unknown error occurred. Please try again.`
        }

        setActivatingConnector(undefined)
        setErrorMessage(message)
    }

    return {
        connector,
        address: account,
        shortenAddress: shortenIfAddress(account),
        isActive: active,
        isConnected: !!account,
        connect: handleConnect,
        disconnect: () => deactivate(),
        etherBalance: formatEther(etherBalance || 0),
        etherSymbol: Symbols[chainId] || Symbols[ChainId.Mainnet],
        chainName: CHAIN_NAMES[chainId] || CHAIN_NAMES[ChainId.Mainnet],
        explorerUrl: getExplorerAddressLink(account, chainId),
        activatingConnector,
        errorMessage,
        chainId
    }
}
