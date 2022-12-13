import Card from '@components/molecules/card'
import { withIpfsGateway } from '@hooks/nft/use-nfts'
import { t } from '@lingui/macro'
import Nft from '../../../../types/nft'
import NftModelViewer from '../common/model-viewer'

export interface NftCardProps {
  nft: Nft
}

export default function NftCard({ nft }: NftCardProps) {
  return (
    <div style={{ borderColor: '#1b2f47' }} className="card bg-transparent blur-background-2 mb-4 overflow-hidden">
      <div style={{ width: '100%', height: '16rem' }}>
        <NftModelViewer url={withIpfsGateway(nft.metadata.animation_url)} />
      </div>
      <div className="card-body">
        <h2 className="d-flex">
          <span className="me-4">{nft.metadata.name}</span>
          <span className="ms-auto">
            #
            {nft.id}
          </span>
        </h2>
        <div className="d-flex">
          <span className="me-4">{t`Level`}</span>
          <span className="ms-auto">{nft.metadata.level}</span>
        </div>
      </div>
    </div>
  )
}
