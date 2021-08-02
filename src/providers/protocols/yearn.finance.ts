import { ChainId } from '@usedapp/core'
import { ITokenProvider } from '../../types/investment'

export const yVaultProvider: ITokenProvider = {
  yvUSDC: {
    symbol: 'yvUSDC',
    name: 'USDC yVault',
    decimals: 6,
    chainAddresses: {
      [ChainId.Mainnet]: '0x5f18c75abdae578b483e5f43f12a39cf75b973a9',
      [ChainId.Kovan]: '',
    }
  },
  yvDAI: {
    symbol: 'yvDAI',
    name: 'DAI yVault',
    decimals: 18,
    chainAddresses: {
      [ChainId.Mainnet]: '0x19d3364a399d251e894ac732651be8b0e4e85001',
      [ChainId.Kovan]: '',
    }
  },
  yvUSDT: {
    symbol: 'yvUSDT',
    name: 'USDT yVault',
    decimals: 6,
    chainAddresses: {
      [ChainId.Mainnet]: '0x7Da96a3891Add058AdA2E826306D812C638D87a7',
      [ChainId.Kovan]: '',
    }
  },
}
