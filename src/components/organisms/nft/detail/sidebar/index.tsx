import React, {useState} from 'react'
import {t} from '@lingui/macro'
import moment from 'moment'
import {ThreeDots} from '@styled-icons/bootstrap'
import {EventAvailable} from '@styled-icons/material-outlined'
import {CheckCircle} from '@styled-icons/feather'
import {Copy} from '@styled-icons/boxicons-regular/'
import {useDapp} from '@context/dapp-context'
import useCopyClipboard from '@hooks/use-copy-clipboard'
import {NftRarities, MaxMintable} from '@config/nft'
import * as Styles from './styles'
import {useNftDetail} from '@context/nft-detail-context'
import Icon from '@components/atoms/icon'
import TruncateText from '../../../../../helpers/truncate-text'
import GradientButton from '@components/atoms/button/gradient-button'
import UpgradeModal from '@components/organisms/nft/upgrade/upgrade-modal'
import RevealModal from '@components/organisms/nft/reveal/reveal-modal'
import { SubLine } from '../Styles'

export default function NftDetailSidebar() {
  const [copiedTokenId, setCopiedTokenId] = useCopyClipboard()
  const [showModal, setShowModal] = useState(false)

  const {
    id,
    name,
    description,
    attributes,
    rarity,
    mintedCount,
    ownerHistory
  } = useNftDetail()

  const {
    walletAddress
  } = useDapp()

  // TODO CHECK THIS MORE PRECISELY
  const isReveal = !attributes.length

  const ModalComponent = isReveal ? RevealModal : UpgradeModal

  return (
    <section className="mt-5 mt-md-0">
      <div className="mb-4 d-flex">
        <Styles.Batch style={{backgroundColor: NftRarities[rarity].color}}
                      className="px-4 py-2 me-3 text-uppercase fw-bold">
          {NftRarities[rarity].label}
        </Styles.Batch>
        {attributes.length > 0 &&
          <Styles.BlueBatch className="px-4 py-2 text-uppercase fw-bold">
            {attributes.length} {attributes.length > 1 ? t`Utilities` : t`Utility`}
          </Styles.BlueBatch>
        }
      </div>
      <h2 style={{fontSize: '50px', lineHeight: '64px'}} className="display-2">{name}</h2>
      <div className="mb-2">
        <span className="text-muted">Token ID: {id}</span>
        <Icon style={{top: '-2px'}} className="ms-2 position-relative cur" onClick={() => setCopiedTokenId(id)}
              component={Copy} color="#FFFFFF" size={20}/>
        {copiedTokenId && <Icon className="ms-2 ps-2" component={CheckCircle} color="#00FF00" size={23}/>}
      </div>
      <p className="text-muted mb-4">
        {description}
      </p>
      <div className="d-flex mb-4">
        <div className="d-flex align-items-center me-4">
          <Icon className="me-3 position-relative" component={Copy} color="#FFFFFF" size={16}/>
          {mintedCount} / {MaxMintable} {t`minted`}
        </div>
        <div className="d-flex align-items-center me-4">
          <Icon className="me-3 position-relative" component={EventAvailable} color="#FFFFFF" size={16}/>
          {mintedCount} / {MaxMintable} {t`in stock`}
        </div>
        <div className="d-flex align-items-center">
          <Icon className="me-3 position-relative" component={ThreeDots} color="#FFFFFF" size={16}/>
          {rarity} / {Object.keys(NftRarities).length} {t`qualities`}
        </div>
      </div>
      <div className="mb-4">
        <div className="mb-4 pb-3 mt-4">
          <div className="row">
            <div className="col-lg-4">
              <small className="text-muted text-uppercase mb-2 d-block">{t`Current Price`}</small>
              <div>3 ETH</div>
              <small className="text-muted">3.769 USD</small>
            </div>
            <div className="col-lg-4">
              <small className="text-muted text-uppercase mb-2 d-block">{t`Owner`}</small>
              <div>{TruncateText(walletAddress, 20)}</div>
              <small className="text-muted">3.769 USD</small>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center">
          <GradientButton onClick={() => setShowModal(true)} className="w-100">
            {isReveal ? t`Reveal NFT` : t`Upgrade NFT`}
          </GradientButton>
        </div>

        <div className="mt-5">
          <SubLine className="mb-4 fw-bold">
            {t`Owner History`}:
          </SubLine>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <div className="mb-4 text-muted fw-bold">
                    {t`Seller`}
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-4 text-muted fw-bold">
                    {t`Transaction Date`}
                  </div>
                </div>
              </div>

              {ownerHistory.length > 0 && ownerHistory.map((item) => (
                <div className="border-bottom pb-3 mb-3">
                  <div className="row">
                    <div className="col-6">
                      <div className="text-uppercase">
                        {TruncateText(item.id, 20)}
                      </div>
                    </div>
                    {item.nfts[id].timestamps.length > 0 &&
                      <div className="col-6">
                        <div className="text-uppercase">
                          {moment(item.nfts[id].timestamps[0] * 1000).format('MM/DD/YYYY, h:mm:ss a')}
                        </div>
                      </div>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {<ModalComponent key={`${showModal}`} tokenId={id} show={showModal} onHide={() => setShowModal(false)} />}
    </section>
  )
}
