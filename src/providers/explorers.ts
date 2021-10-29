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
    [ChainId.Mainnet]: 'https://etherscan.io/block/%BLOCKNUMBER%',
    [ChainId.Ropsten]: 'https://ropsten.etherscan.io/block/%BLOCKNUMBER%',
    [ChainId.Kovan]: 'https://kovan.etherscan.io/block/%BLOCKNUMBER%',
    [ChainId.Rinkeby]: 'https://rinkeby.etherscan.io/block/%BLOCKNUMBER%',
    [ChainId.Goerli]: 'https://goerli.etherscan.io/block/%BLOCKNUMBER%',
    [ChainId.BSC]: 'https://bscscan.com/block/%BLOCKNUMBER%',
    [ChainId.xDai]: 'https://blockscout.com/xdai/mainnet/blocks/%BLOCKNUMBER%',
    [ChainId.Polygon]: 'https://polygon-explorer-mainnet.chainstacklabs.com/blocks/%BLOCKNUMBER%/transactions',
    [ChainId.Mumbai]: 'https://polygon-explorer-mumbai.chainstacklabs.com/blocks/%BLOCKNUMBER%/transactions',
}
