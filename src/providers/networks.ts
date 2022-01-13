import { ChainId } from '@usedapp/core'
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
        rpcUrls: ['https://mainnet.infura.io/v3'],
        blockExplorerUrls: [explorers[ChainId.Mainnet]],
    },
    // [ChainId.BSC]: {
    //     chainId: '0x38',
    //     chainName: 'BSC',
    //     nativeCurrency: {
    //         name: 'Binance Coin',
    //         symbol: 'BNB',
    //         decimals: 18,
    //     },
    //     rpcUrls: [rpcUrls[ChainId.BSC]],
    //     blockExplorerUrls: [explorers[ChainId.BSC]],
    // },
    [ChainId.Polygon]: {
        chainId: '0x89',
        chainName: 'Polygon - Mainnet',
        nativeCurrency: {
            name: 'Matic',
            symbol: 'MATIC',
            decimals: 18,
        },
        rpcUrls: [rpcUrls[ChainId.Polygon]],
        blockExplorerUrls: [explorers[ChainId.Polygon]],
    },
}
