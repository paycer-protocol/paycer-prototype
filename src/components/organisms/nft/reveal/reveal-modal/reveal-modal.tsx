import GradientButton from "@components/atoms/button/gradient-button";
import Modal from "@components/molecules/modal";
import TransactionApproveModal from "@components/organisms/transaction-approve-modal";
import useNftReveal from "@hooks/nft/use-reveal";
import { t } from "@lingui/macro";
import NftModelViewer from "../../common/model-viewer";

export interface RevealModalProps {
  tokenId: string
  show: boolean
  onHide: () => void
}

export default function RevealModal({ tokenId, show, onHide }: RevealModalProps) {
  const nftReveal = useNftReveal(tokenId);
  return (
    <>
      {
        nftReveal.status !== 'success' && (
          <TransactionApproveModal
            show={show}
            onHide={onHide}
            title={t`Confirm Reveal`}
            onClick={() => { nftReveal.status === 'idle' && nftReveal.reveal() }}
            infoMessage={t`Revealing NFT...`}
            successMessage={t`Transaction was successfully executed`}
            error={nftReveal.status === 'error' ? new Error(t`Something went wrong, please try again later.`) : undefined}
            success={false}
            loading={nftReveal.status === 'loading'}
          >
            <></>
          </TransactionApproveModal>
        )
      }
      {
        nftReveal.status === 'success' && (
          <Modal show={show} onHide={onHide} centered>
            <>
              <Modal.Title>{t`Your NFT was revealed successfully`}</Modal.Title>
              <NftModelViewer url={nftReveal.nft.metadata.animation_url} />
              <Modal.Footer>
                <GradientButton>{t`View Details`}</GradientButton>
              </Modal.Footer>
            </>
          </Modal>
        )
      }
    </>
  );
}