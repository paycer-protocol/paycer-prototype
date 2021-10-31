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

// P314 | Todo - Discuss solution (simplify?)
export const explorerBlockURLs = {
    [ChainId.Mainnet]: '/block/%BLOCKNUMBER%',
    [ChainId.Ropsten]: '/block/%BLOCKNUMBER%',
    [ChainId.Kovan]: '/block/%BLOCKNUMBER%',
    [ChainId.Rinkeby]: '/block/%BLOCKNUMBER%',
    [ChainId.Goerli]: '/block/%BLOCKNUMBER%',
    [ChainId.BSC]: '/block/%BLOCKNUMBER%',
    [ChainId.xDai]: '/xdai/mainnet/blocks/%BLOCKNUMBER%',
    [ChainId.Polygon]: '/blocks/%BLOCKNUMBER%/transactions',
    [ChainId.Mumbai]: '/blocks/%BLOCKNUMBER%/transactions',
}
