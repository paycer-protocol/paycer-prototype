import {ChainId} from '@usedapp/core'


export interface IContractProvider {
  [name: string]: {
    chainAddresses: {
      [ChainId.Mainnet]: string
      [ChainId.Kovan]: string
      [ChainId.BSC]: string
      [ChainId.Polygon]: string
      [ChainId.Mumbai]: string
      [ChainId.Ropsten]?: string
      [ChainId.Rinkeby]?: string
      [ChainId.Goerli]?: string
      [ChainId.xDai]?: string
      [ChainId.Hardhat]?: string
    }
  }
}


export const contractProvider: IContractProvider = {
  StakingRewards: {
    chainAddresses: {
      [ChainId.Mainnet]: '0xDdB24eC5fFf14f4809eB5163126F41307d93d184',
      [ChainId.Ropsten]: '',
      [ChainId.Kovan]: '0x0E82F205cbc6FF249212D36befb29E87b8d51cDb',
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
