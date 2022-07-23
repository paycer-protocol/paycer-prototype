import React from 'react'
import { t } from '@lingui/macro'
import { ThreeDots } from '@styled-icons/bootstrap'
import { EventAvailable } from '@styled-icons/material-outlined'
import {CheckCircle} from '@styled-icons/feather'
import { Copy } from '@styled-icons/boxicons-regular/'
import NftRarityColorBadge from '@components/atoms/nft/nft-rarity-color-badge/styles'
import useStaking from '@hooks/use-staking'
import useCopyClipboard from '@hooks/use-copy-clipboard'
import { NftRarities, MaxMintable } from '@config/nft'
import { getStakingTierByBalance, stakingTiers } from '@config/staking-rewards'
import * as Styles from './styles'
import { useNftDetail } from '@context/nft-detail-context'
import Icon from '@components/atoms/icon'
import DashNumber from '@components/organisms/dashboard/dash-number'

export default function NftDetailSidebar() {
  const [copiedTokenId, setCopiedTokenId] = useCopyClipboard()

  const {
    id,
    name,
    description,
    attributes,
    rarity,
    mintedCount,
      ownerHistory
  } = useNftDetail()

    console.log(ownerHistory, 'yoyoyoy')

  const { stakedBalance } = useStaking()

  return (
    <section>
      <div className="mb-4 d-flex">
        <Styles.Batch style={{backgroundColor: NftRarities[rarity].color}} className="px-4 py-2 me-3 text-uppercase fw-bold">
          {NftRarities[rarity].label}
        </Styles.Batch>
          {attributes.length > 0 &&
            <Styles.BlueBatch className="px-4 py-2 text-uppercase fw-bold">
              {attributes.length} {attributes.length > 1 ? t`Utilities` : t`Utility`}
            </Styles.BlueBatch>
          }
      </div>
      <h2 style={{ fontSize: '50px' }} className="display-2">{name}</h2>
      <div className="mb-2">
        <span className="text-muted">Token ID: {id}</span>
        <Icon style={{top: '-2px'}} className="ms-2 position-relative cur" onClick={() => setCopiedTokenId(id)} component={Copy} color="#FFFFFF" size={20} />
        {copiedTokenId && <Icon className="ms-2 ps-2" component={CheckCircle} color="#00FF00" size={23} />}
      </div>
      <p className="text-muted mb-4">
       {description}
      </p>
      <div className="d-flex mb-4">
        <div className="d-flex align-items-center me-4">
          <Icon className="me-3 position-relative" component={Copy} color="#FFFFFF" size={16} />
          {mintedCount} / {MaxMintable} {t`minted`}
        </div>
        <div className="d-flex align-items-center me-4">
          <Icon className="me-3 position-relative" component={EventAvailable} color="#FFFFFF" size={16} />
          {mintedCount} / {MaxMintable} {t`in stock`}
        </div>
        <div className="d-flex align-items-center">
          <Icon className="me-3 position-relative" component={ThreeDots} color="#FFFFFF" size={16} />
          {rarity} / {Object.keys(NftRarities).length} {t`qualities`}
        </div>
      </div>
      <div className="mb-4">
        <div className="text-uppercase mb-3 fw-bold">
          {t`Minted NFT`}:
        </div>
        <div className="row mb-3">
          <div className="col-lg-4">
            {t`Staked`}:
          </div>
          <div className="col-lg-8 justify-content-end d-flex">
            {stakedBalance &&
              <>
                <DashNumber
                  value={stakedBalance}
                  symbol="PCR"
                />&nbsp;
                ({stakingTiers[getStakingTierByBalance(stakedBalance)].label})
              </>
            }
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-6">
            {t`NFT Rarity color`}:
          </div>
          <div className="col-lg-6 d-flex align-items-center justify-content-end ">
            <NftRarityColorBadge color={NftRarities[rarity].color} />
          </div>
        </div>
        {attributes.length > 0 &&
          <div className="row mb-3">
            <div className="col-lg-6">
              {t`Utilities`}:
            </div>
            <div className="col-lg-6 text-end">
              {attributes.length} {attributes.length > 1 ? t`Utilities` : t`Utility`}
            </div>
          </div>
        }
      </div>
    </section>
  )
}
