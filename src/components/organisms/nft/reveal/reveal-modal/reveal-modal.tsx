import GradientButton from '@components/atoms/button/gradient-button'
import Modal from '@components/molecules/modal'
import RevealApproveModal from '@components/organisms/nft/reveal/reveal-modal/reveal-approve-modal'
import useNfts, { withIpfsGateway } from '@hooks/nft/use-nfts'
import useNftReveal from '@hooks/nft/use-reveal'
import { t } from '@lingui/macro'
import NftModelViewer from '../../common/model-viewer'

export interface RevealModalProps {
  tokenId: string
  show: boolean
  onHide: () => void
}

export default function RevealModal({ tokenId, show, onHide }: RevealModalProps) {
  const nftReveal = useNftReveal(tokenId)
  return (
      <RevealApproveModal
          show={show}
          onHide={onHide}
          title={t`Confirm Reveal`}
          onClick={() => { nftReveal.status === 'idle' && nftReveal.reveal() }}
          infoMessage={t`Revealing NFT. This may take a while.`}
          successMessage={t`Transaction was successfully executed`}
          nftReveal={nftReveal}
      />
  )
}
