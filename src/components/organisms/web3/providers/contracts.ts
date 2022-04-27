import ChainId from '@providers/chain-id'


export interface IContractProvider {
  [name: string]: {
    chainAddresses: {
      [ChainId.Mainnet]: string
      [ChainId.Ropsten]: string
      [ChainId.Kovan]: string
      [ChainId.Rinkeby]: string
      [ChainId.Goerli]: string
      [ChainId.BSC]: string
      [ChainId.xDai]: string
      [ChainId.Polygon]: string
      [ChainId.Mumbai]: string
      [ChainId.Hardhat]: string
    }
  }
}


export const contractProvider: IContractProvider = {
  StakingRewards: {
    chainAddresses: {
      [ChainId.Mainnet]: '',
      [ChainId.Ropsten]: '',
      [ChainId.Kovan]: '',
      [ChainId.Rinkeby]: '',
      [ChainId.Goerli]: '',
      [ChainId.BSC]: '',
      [ChainId.xDai]: '',
      [ChainId.Polygon]: '',
      [ChainId.Mumbai]: '',
      [ChainId.Hardhat]: '0x9d4454B023096f34B160D6B654540c56A1F81688',
    }
  },
}
