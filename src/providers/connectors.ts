import { t } from '@lingui/macro'

type Web3ProviderType =
    | 'metamask'
    | 'walletconnect'
    | 'walletConnect'
    | 'wc'
    | 'magicLink'
    | 'web3Auth'

export interface IConnectorProvider {
  name: string
  providerId: Web3ProviderType
  description?: string
  icon: string,
  beforeConnect?: any
}

export const connectors: IConnectorProvider[] = [
  {
    name: 'MetaMask',
    providerId: 'metamask',
    description: t`Easy-to-use browser extension.`,
    icon: '/assets/wallets/metamask.png',
  },
  {
    name: 'WalletConnect',
    providerId: 'walletconnect',
    description: t`Connect to Trust Wallet, Rainbow Wallet and more...`,
    icon: '/assets/wallets/wallet-connect.svg',
  },
]
