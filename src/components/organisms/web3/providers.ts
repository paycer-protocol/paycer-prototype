import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { ChainId } from '@usedapp/core'

const Endpoints = {
    [ChainId.Mainnet]: 'https://eth-mainnet.alchemyapi.io/v2/q1gSNoSMEzJms47Qn93f9-9Xg5clkmEC',
    [ChainId.Ropsten]: 'https://eth-ropsten.alchemyapi.io/v2/cidKix2Xr-snU3f6f6Zjq_rYdalKKHmW',
    [ChainId.Rinkeby]: 'https://eth-rinkeby.alchemyapi.io/v2/XVLwDlhGP6ApBXFz_lfv0aZ6VmurWhYD',
    [ChainId.Goerli]: 'https://eth-goerli.alchemyapi.io/v2/Dkk5d02QjttYEoGmhZnJG37rKt8Yl3Im',
    [ChainId.Kovan]: 'https://eth-kovan.alchemyapi.io/v2/6OVAa_B_rypWWl9HqtiYK26IRxXiYqER',
}

export const walletConnectConnector = new WalletConnectConnector({
    rpc: { [ChainId.Mainnet]: Endpoints[ChainId.Mainnet] },
    bridge: 'https://bridge.walletconnect.org',
    pollingInterval: 15000,
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

export default [
    {
        connector: injectedConnector,
        name: 'MetaMask',
        description: 'Easy-to-use browser extension.',
        icon: 'assets/wallets/metamask.png'
    },
    {
        connector: walletConnectConnector,
        name: 'WalletConnect',
        description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
        icon: 'assets/wallets/wallet-connect.svg'
    },
]
