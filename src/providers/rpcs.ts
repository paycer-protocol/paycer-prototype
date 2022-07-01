import { ChainId } from '@usedapp/core'

export interface IRpcUrl {
  [chainId: number]: string
}

export const rpcUrls: IRpcUrl = {
  [ChainId.Mainnet]: 'https://eth-mainnet.alchemyapi.io/v2/q1gSNoSMEzJms47Qn93f9-9Xg5clkmEC',
  [ChainId.Ropsten]: 'https://eth-ropsten.alchemyapi.io/v2/cidKix2Xr-snU3f6f6Zjq_rYdalKKHmW',
  [ChainId.Rinkeby]: 'https://eth-rinkeby.alchemyapi.io/v2/XVLwDlhGP6ApBXFz_lfv0aZ6VmurWhYD',
  [ChainId.Goerli]: 'https://eth-goerli.alchemyapi.io/v2/Dkk5d02QjttYEoGmhZnJG37rKt8Yl3Im',
  [ChainId.Kovan]: 'https://eth-kovan.alchemyapi.io/v2/6OVAa_B_rypWWl9HqtiYK26IRxXiYqER',
  [ChainId.BSC]: 'https://bsc-dataseed.binance.org',
  [ChainId.Polygon]: 'https://polygon-rpc.com/',
  [ChainId.Mumbai]: 'https://rpc-mumbai.maticvigil.com',
  [ChainId.xDai]: 'https://rpc.xdaichain.com',
  [ChainId.Hardhat]: 'http://127.0.0.1:8545',

}
