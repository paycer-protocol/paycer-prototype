import { t } from '@lingui/macro'
import {supportedChains, supportedStakingChains, supportedVestingChains} from './network'

export const routes = [
  {
    label: t`Staking`,
    path: '/',
    supportedChains: supportedStakingChains,
    auth: false
  },
  {
    label: t`Vesting`,
    path: '/vesting',
    supportedChains: supportedVestingChains
  },
  {
    label: t`Portfolio`,
    path: '/portfolio',
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
    label: t`Swap`,
    path: '/swap',
    supportedChains,
    auth: false
  },
  {
    label: t`Analytics`,
    path: '/analytics',
    supportedChains,
    auth: false
  },
  {
    label: t`PCR Token`,
    path: '/token-overview',
    supportedChains,
    auth: false
  },
  {
    label: t`Collect`,
    path: '/collect',
    supportedChains,
    auth: false
  }
]
