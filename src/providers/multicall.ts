import { ChainId } from '@usedapp/core'

export interface IMulticallAddress {
  [chainId: number]: string
}

export const multicallAddresses: IMulticallAddress = {
  [ChainId.Mainnet]: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
  [ChainId.Kovan]: '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a',
  [ChainId.BSC]: '##todo##',
  [ChainId.Polygon]: '0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507',
  [ChainId.Mumbai]: '0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc',
}
