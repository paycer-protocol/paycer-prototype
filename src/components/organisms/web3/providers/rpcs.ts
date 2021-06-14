import { ChainId } from '@usedapp/core'

export interface IRpcUrl {
    [chainId: number]: string
}

export const rpcUrls: IRpcUrl = {
    [ChainId.Mainnet]: process.env.ALCHEMYAPI_MAINNET,
    [ChainId.Ropsten]: process.env.ALCHEMYAPI_REPOSTEN,
    [ChainId.Rinkeby]: process.env.ALCHEMYAPI_RINKEBY,
    [ChainId.Goerli]: process.env.ALCHEMYAPI_GOERLI,
    [ChainId.Kovan]: process.env.ALCHEMYAPI_KOVAN,
    [ChainId.BSC]: 'https://bsc-dataseed.binance.org',
    [ChainId.Polygon]: 'https://rpc-mainnet.maticvigil.com',
    [ChainId.Mumbai]: 'https://rpc-mumbai.maticvigil.com',
    [ChainId.xDai]: 'https://rpc.xdaichain.com',

}
