import { ChainId, Mainnet, Polygon, Kovan, Mumbai } from '@usedapp/core'
import { explorers } from './explorers'
import { rpcUrls } from './rpcs'

export interface INetworkProvider {
    [chainId: number]: {
        chainId: string
        chainName: string
        nativeCurrency: {
            name: string
            symbol: string
            decimals: number
        }
        rpcUrls: string[]
        blockExplorerUrls: string[],
        getExplorerAddressLink: any,
        nativeWrappedTokenInfo: {
            chainId: ChainId
            contractAddress: string
            decimals: number
            symbol: string
            name: string
        },
        multicallAddress?: string
    }
}

export const testNetNetworks: INetworkProvider = {
    [ChainId.Kovan]: {
        chainId: '0x2A',
        chainName: 'Kovan',
        nativeCurrency: {
            name: 'Ethereum - Kovan',
            symbol: 'ETH',
            decimals: 18,
        },
        rpcUrls: [rpcUrls[ChainId.Kovan]],
        blockExplorerUrls: [explorers[ChainId.Kovan]],
        getExplorerAddressLink: Kovan.getExplorerAddressLink,
        nativeWrappedTokenInfo: {
            chainId: ChainId.Kovan,
            contractAddress: "0xf3a6679b266899042276804930b3bfbaf807f15b",
            decimals: 18,
            symbol: 'WETH',
            name: 'Wrapped ETH'
        },
        multicallAddress: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696'
    },
    [ChainId.Mumbai]: {
        chainId: '0x13881',
        chainName: 'Polygon - Testnet',
        nativeCurrency: {
            name: 'Polygon (MATIC Mumbai)',
            symbol: 'MATIC',
            decimals: 18,
        },
        rpcUrls: [rpcUrls[ChainId.Mumbai]],
        blockExplorerUrls: [explorers[ChainId.Mumbai]],
        getExplorerAddressLink: Mumbai.getExplorerAddressLink,
        nativeWrappedTokenInfo: {
            chainId: ChainId.Mumbai,
            contractAddress: "##todo##",
            decimals: 18,
            symbol: 'WMATIC',
            name: 'Wrapped Matic'
        },
        multicallAddress: '0xe9939e7Ea7D7fb619Ac57f648Da7B1D425832631'
    },
}

export const mainNetProviders: INetworkProvider = {
    [ChainId.Mainnet]: {
        chainId: '0x1',
        chainName: 'Ethereum',
        nativeCurrency: {
            name: 'Ethereum',
            symbol: 'ETH',
            decimals: 18,
        },
        rpcUrls: [rpcUrls[ChainId.Mainnet]],
        blockExplorerUrls: [explorers[ChainId.Mainnet]],
        getExplorerAddressLink: Mainnet.getExplorerAddressLink,
        nativeWrappedTokenInfo: {
            chainId: ChainId.Mainnet,
            contractAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            decimals: 18,
            symbol: 'WETH',
            name: 'Wrapped ETH'
        },
        multicallAddress: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696'
    },
    [ChainId.Polygon]: {
        chainId: '0x89',
        chainName: 'Polygon',
        nativeCurrency: {
            name: 'Matic',
            symbol: 'MATIC',
            decimals: 18,
        },
        rpcUrls: [rpcUrls[ChainId.Polygon]],
        blockExplorerUrls: [explorers[ChainId.Polygon]],
        getExplorerAddressLink: Polygon.getExplorerAddressLink,
        nativeWrappedTokenInfo: {
            chainId: ChainId.Polygon,
            contractAddress: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
            decimals: 18,
            symbol: 'WMATIC',
            name: 'Wrapped Matic'
        },
        multicallAddress: '0x275617327c958bD06b5D6b871E7f491D76113dd8'
    },
}

export const chainedNetworkProvider = {
    ...testNetNetworks,
    ...mainNetProviders,
}
