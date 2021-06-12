import { ChainId } from '@usedapp/core'

export const BlockchainExplorer = {
    [ChainId.Mainnet]: 'https://etherscan.io',
    [ChainId.Ropsten]: 'https://ropsten.etherscan.io',
    [ChainId.Kovan]: 'https://kovan.etherscan.io',
    [ChainId.Rinkeby]: 'https://rinkeby.etherscan.io',
    [ChainId.Goerli]: 'https://goerli.etherscan.io',
    [ChainId.BSC]: 'https://bscscan.com',
    [ChainId.xDai]: 'https://blockscout.com/xdai/mainnet',
    [ChainId.Polygon]: 'https://polygon-explorer-mainnet.chainstacklabs.com',
    [ChainId.Mumbai]: 'https://polygon-explorer-mumbai.chainstacklabs.com',
    [ChainId.Localhost]: '',
    [ChainId.Hardhat]: '',
}
