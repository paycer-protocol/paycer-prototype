import { ChainId } from '@usedapp/core'

export const explorers = {
    [ChainId.Mainnet]: 'https://etherscan.io',
    [ChainId.Ropsten]: 'https://ropsten.etherscan.io',
    [ChainId.Kovan]: 'https://kovan.etherscan.io',
    [ChainId.Rinkeby]: 'https://rinkeby.etherscan.io',
    [ChainId.Goerli]: 'https://goerli.etherscan.io',
    [ChainId.BSC]: 'https://bscscan.com',
    [ChainId.xDai]: 'https://blockscout.com/xdai/mainnet',
    [ChainId.Polygon]: 'https://polygon-explorer-mainnet.chainstacklabs.com',
    [ChainId.Mumbai]: 'https://polygon-explorer-mumbai.chainstacklabs.com',
}

const blockUrlSegment: string = '%BLOCKNUMBER%'

export const explorerBlockURLs =  {
    [ChainId.Mainnet]: `/block/${blockUrlSegment}`,
    [ChainId.Ropsten]: `/block/${blockUrlSegment}`,
    [ChainId.Kovan]: `/block/${blockUrlSegment}`,
    [ChainId.Rinkeby]: `/block/${blockUrlSegment}`,
    [ChainId.Goerli]: `/block/${blockUrlSegment}`,
    [ChainId.BSC]: `/block/${blockUrlSegment}`,
    [ChainId.xDai]: `/xdai/mainnet/blocks/${blockUrlSegment}`,
    [ChainId.Polygon]: `/blocks/${blockUrlSegment}/transactions`,
    [ChainId.Mumbai]: `/blocks/${blockUrlSegment}/transactions`,
}

/**
 * Security hint: Enforce number type for 'blockNumber' during runtime, as it's coming from a potentially unsafe source.
 * Non-numeric values result in the 'NaN' type, which is desired over possible unsafe behavior.
 */
export const getExplorerBlockUrl = (chainId: ChainId, blockNumber: number): string => {
    const explorerBlockURL: string = explorerBlockURLs[chainId]
    const blockNumberSanitized: number = Number(blockNumber)

    if (!explorerBlockURL || blockNumberSanitized === NaN) {
        throw new Error(`No or broken URL for chainId: ${chainId} and blockNumber: ${blockNumberSanitized}`)
    }

    return explorerBlockURL.replace(blockUrlSegment, blockNumberSanitized.toString())
}
