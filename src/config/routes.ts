import { t } from '@lingui/macro'
import { supportedChains, supportedStakingChains } from './network'

export const routes = [
  {
    label: t`Portfolio`,
    path: '/',
    supportedChains,
    auth: false,
    hasDropdown: false
  },
  {
    label: t`Invest`,
    path: '/invest',
    supportedChains,
    subroutes: [
      {
        label: false,
        path: '/invest/create',
      }
    ],
    auth: false,
    hasDropdown: false
  },
  {
    label: t`Staking`,
    path: '/staking',
    supportedChains: supportedStakingChains,
    auth: false,
    hasDropdown: false
  },
  {
    label: t`Swap`,
    path: '/swap',
    supportedChains,
    auth: false,
    hasDropdown: false
  },
  {
    label: t`Investor Dashboard`,
    path: '/investor-dashboard',
    supportedChains,
    auth: false,
    hasDropdown: false
  },
  {
    label: t`Token Sale`,
    path: '/token-sale',
    supportedChains,
    auth: false,
    hasDropdown: false
  }
]
