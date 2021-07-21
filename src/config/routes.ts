import { t } from '@lingui/macro'

export const routes = [
  {
    label: t`Portfolio`,
    path: '/',
  },
  {
    label: t`Invest`,
    path: '/invest',
    subroutes: [
      {
        path: '/invest/create',
      }
    ]
  },
  {
    label: t`Staking`,
    path: '/staking',
  },
  {
    label: t`Docs`,
    path: '/docs',
  },
]
