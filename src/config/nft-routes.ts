import { t } from '@lingui/macro'

export const nftRoutes = [
  {
    label: t`About Paycer NFT`,
    path: '/nft',
    auth: false,
  },
  {
    label: t`My NFTs`,
    path: '/my-nfts',
    auth: true,
  },
  {
    label: t`Upgrade NFT`,
    path: '/upgrade-nft',
    auth: true,
  },
]
