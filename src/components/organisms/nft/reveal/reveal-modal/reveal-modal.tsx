import RevealApproveModal from '@components/organisms/nft/reveal/reveal-modal/reveal-approve-modal'
import useNftReveal from '@hooks/nft/use-reveal'
import { t } from '@lingui/macro'

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
