import { t } from '@lingui/macro'
import { supportedChains, supportedStakingChains } from './network'

export const routes = [
  {
    label: t`Portfolio`,
    path: '/',
    supportedChains,
    auth: false
  },
  {
    label: t`Invest`,
    path: '/invest',
    supportedChains,
    subroutes: [
      {
        path: '/invest/create',
      }
    ],
    auth: false
  },
  {
    label: t`Staking`,
    path: '/staking',
    supportedChains: supportedStakingChains,
    auth: false
  },
  {
    label: t`Swap`,
    path: '/swap',
    supportedChains,
    auth: false
  },
  {
    label: t`Token Sale`,
    path: '/token-sale',
    supportedChains,
    auth: true
  }
]
