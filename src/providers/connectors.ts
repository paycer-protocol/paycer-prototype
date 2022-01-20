import { t } from '@lingui/macro'
import { InjectedConnector, UserRejectedRequestError } from '@web3-react/injected-connector'
import { WalletConnectConnector, UserRejectedRequestError as  WalletConnectRejectedRequestError } from '@web3-react/walletconnect-connector'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { LedgerConnector } from '@web3-react/ledger-connector'
import { TrezorConnector } from '@web3-react/trezor-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { ChainId } from '@usedapp/core'
import { rpcUrls } from './rpcs'

const APP_URL = process.env.APP_URL
const APP_EMAIL = process.env.APP_EMAIL
const POLLING_INTERVAL = 15000

export const walletConnectConnector = new WalletConnectConnector({
    rpc: { [ChainId.Mainnet]: rpcUrls[ChainId.Mainnet] },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
})

export const walletlink = new WalletLinkConnector({
    url: rpcUrls[ChainId.Mainnet],
    appName: 'Paycer',
    appLogoUrl: 'https://www.paycer.io/logo.svg',
})

export const injectedConnector = new InjectedConnector({
    supportedChainIds: [
        ChainId.Mainnet,
        ChainId.Ropsten,
        ChainId.Rinkeby,
        ChainId.Goerli,
        ChainId.Kovan,
        ChainId.BSC,
        ChainId.xDai,
        ChainId.Polygon,
        ChainId.Mumbai,
        ChainId.Hardhat,
        ChainId.Localhost,
    ],
})

export const trezorConnector = new TrezorConnector({
    chainId: ChainId.Mainnet,
    url: rpcUrls[ChainId.Mainnet],
    pollingInterval: POLLING_INTERVAL,
    manifestEmail: APP_EMAIL,
    manifestAppUrl: APP_URL
})

export const ledgerConnector = new LedgerConnector({
    chainId: ChainId.Mainnet,
    url: rpcUrls[ChainId.Mainnet],
    pollingInterval: POLLING_INTERVAL
})

export interface IConnectorProvider {
    connector: AbstractConnector
    rejectedError: typeof UserRejectedRequestError
    name: string
    description?: string
    icon: string,
    beforeConnect: any
}

export const connectors: IConnectorProvider[] = [
    {
        connector: injectedConnector,
        rejectedError: UserRejectedRequestError,
        name: 'MetaMask',
        description: t`Easy-to-use browser extension.`,
        icon: '/assets/wallets/metamask.png',
        beforeConnect: (provider: IConnectorProvider) => provider.connector
    },
    {
        connector: walletConnectConnector,
        rejectedError: WalletConnectRejectedRequestError,
        name: 'WalletConnect',
        description: t`Connect to Trust Wallet, Rainbow Wallet and more...`,
        icon: '/assets/wallets/wallet-connect.svg',
        beforeConnect: (provider: IConnectorProvider) => provider.connector
    },
    {
        connector: walletlink,
        rejectedError: UserRejectedRequestError,
        name: 'Coinbase Wallet',
        description: t`The secure app to store crypto yourself`,
        icon: '/assets/wallets/coinbase.svg',
        beforeConnect: (provider: IConnectorProvider) => provider.connector
    },
    {
        connector: trezorConnector,
        rejectedError: UserRejectedRequestError,
        name: 'Trezor',
        description: t`Safe hardware wallet for your coins.`,
        icon: '/assets/wallets/trezor.png',
        beforeConnect: (provider: IConnectorProvider) => provider.connector
    },
    /*
    {
        connector: ledgerConnector,
        rejectedError: UserRejectedRequestError,
        name: 'Ledger',
        description: t`Enjoy security, ownership and ease of use for your crypto with Ledger.`,
        icon: '/assets/wallets/ledger.svg',
        beforeConnect: (provider: IConnectorProvider) => provider.connector
    },
     */
]
