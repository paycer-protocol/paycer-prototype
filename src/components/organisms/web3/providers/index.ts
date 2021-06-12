import { InjectedConnector, UserRejectedRequestError } from '@web3-react/injected-connector'
import { WalletConnectConnector, UserRejectedRequestError as  WalletConnectRejectedRequestError } from '@web3-react/walletconnect-connector'
import { LedgerConnector } from '@web3-react/ledger-connector'
import { TrezorConnector } from '@web3-react/trezor-connector'
import { ChainId } from '@usedapp/core'

const APP_URL = process.env.APP_URL
const APP_EMAIL = process.env.APP_EMAIL
const POLLING_INTERVAL = 15000

const RPC_URLS = {
    [ChainId.Mainnet]: process.env.ALCHEMYAPI_MAINNET,
    [ChainId.Ropsten]: process.env.ALCHEMYAPI_REPOSTEN,
    [ChainId.Rinkeby]: process.env.ALCHEMYAPI_RINKEBY,
    [ChainId.Goerli]: process.env.ALCHEMYAPI_GOERLI,
    [ChainId.Kovan]: process.env.ALCHEMYAPI_KOVAN,
}

export const walletConnectConnector = new WalletConnectConnector({
    rpc: { [ChainId.Mainnet]: RPC_URLS[ChainId.Mainnet] },
    bridge: 'https://bridge.walletconnect.org',
    pollingInterval: POLLING_INTERVAL,
    qrcode: true,
})

export const injectedConnector = new InjectedConnector({
    supportedChainIds: [
        ChainId.Mainnet,
        ChainId.Ropsten,
        ChainId.Rinkeby,
        ChainId.Goerli,
        ChainId.Kovan,
    ],
})

export const trezorConnector = new TrezorConnector({
    chainId: ChainId.Mainnet,
    url: RPC_URLS[ChainId.Mainnet],
    pollingInterval: POLLING_INTERVAL,
    manifestEmail: APP_EMAIL,
    manifestAppUrl: APP_URL
})

export const ledgerConnector = new LedgerConnector({
    chainId: ChainId.Mainnet,
    url: RPC_URLS[ChainId.Mainnet],
    pollingInterval: POLLING_INTERVAL
})

export interface Provider {
    connector: any
    rejectedError: any
    name: string
    description?: string
    icon: string,
    beforeConnect: any
}

export default [
    {
        connector: injectedConnector,
        rejectedError: UserRejectedRequestError,
        name: 'MetaMask',
        description: 'Easy-to-use browser extension.',
        icon: 'assets/wallets/metamask.png',
        beforeConnect: (provider: Provider) => provider.connector
    },
    {
        connector: walletConnectConnector,
        rejectedError: WalletConnectRejectedRequestError,
        name: 'WalletConnect',
        description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
        icon: 'assets/wallets/wallet-connect.svg',
        beforeConnect: (provider: Provider) => {
            const { connector } = provider
            if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
                connector.walletConnectProvider = undefined
            }

            return connector
        }
    },
    {
        connector: trezorConnector,
        rejectedError: UserRejectedRequestError,
        name: 'Trezor',
        description: 'Safe hardware wallet for your coins.',
        icon: 'assets/wallets/trezor.png',
        beforeConnect: (provider: Provider) => provider.connector
    },
    {
        connector: ledgerConnector,
        rejectedError: UserRejectedRequestError,
        name: 'Ledger',
        description: 'Enjoy security, ownership and ease of use for your crypto with Ledger.',
        icon: 'assets/wallets/ledger.svg',
        beforeConnect: (provider: Provider) => provider.connector
    },
]
