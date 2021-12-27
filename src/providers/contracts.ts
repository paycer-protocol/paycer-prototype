import { ChainId } from '@usedapp/core'


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
      [ChainId.Mainnet]: '##TODO##',
      [ChainId.Kovan]: '0x95d1f154655aa4E0ab519CF595647fc9EDfE9fdD',
      [ChainId.Mumbai]: '0x24FdBF97A95d425E2e53D1d35C4920c82Ba784f1',
      [ChainId.BSC]: '',
      [ChainId.Polygon]: '',
      [ChainId.Hardhat]: '## TODO ##',
    }
  },
}
