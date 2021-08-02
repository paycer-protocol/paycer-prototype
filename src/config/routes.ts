import { t } from '@lingui/macro'
import { ChainId } from '@usedapp/core'

export const routes = [
  {
    label: t`Portfolio`,
    path: '/',
    supportedChains: [
      ChainId.Mainnet,
      ChainId.Kovan,
      ChainId.Polygon,
      ChainId.BSC,
      ChainId.Mumbai,
      ChainId.Hardhat,
    ]
  },
  {
    label: t`Invest`,
    path: '/invest',
    supportedChains: [
      ChainId.Mainnet,
      ChainId.Kovan,
      ChainId.Polygon,
      ChainId.BSC,
      ChainId.Mumbai,
      ChainId.Hardhat,
    ],
    subroutes: [
      {
        path: '/invest/create',
      }
    ]
  },
  {
    label: t`Staking`,
    path: '/staking',
    supportedChains: [
      ChainId.Mainnet,
      ChainId.Kovan,
    ],
  }
]
