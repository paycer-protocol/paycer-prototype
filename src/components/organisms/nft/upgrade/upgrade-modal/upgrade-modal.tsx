import GradientButton from "@components/atoms/button/gradient-button";
import Modal from "@components/molecules/modal";
import TransactionApproveModal from "@components/organisms/transaction-approve-modal";
import { withIpfsGateway } from "@hooks/nft/use-nfts";
import useNftUpgrade from "@hooks/nft/use-upgrade";
import { t } from "@lingui/macro";
import NftModelViewer from "../../common/model-viewer";

export interface UpgradeModalProps {
  tokenId: string
  show: boolean
  onHide: () => void
}

export default function UpgradeModal({ tokenId, show, onHide }: UpgradeModalProps) {
  const nftUpgrade = useNftUpgrade(tokenId);
  return (
    <>
      {
        nftUpgrade.status !== 'success' && (
          <TransactionApproveModal
            show={show}
            onHide={onHide}
            title={t`Confirm Upgrade`}
            onClick={() => { nftUpgrade.status === 'idle' && nftUpgrade.upgrade() }}
            infoMessage={t`Upgrading NFT. This may take a while.`}
            successMessage={t`Transaction was successfully executed`}
            error={nftUpgrade.status === 'error' ? new Error(t`Something went wrong, please try again later.`) : undefined}
            success={false}
            loading={nftUpgrade.status === 'loading'}
          >
            <></>
          </TransactionApproveModal>
        )
      }
      {
        nftUpgrade.status === 'success' && (
          <Modal show={show} onHide={onHide} centered>
            <>
              <Modal.Title>{t`Your NFT was upgraded successfully`}</Modal.Title>
              <NftModelViewer url={withIpfsGateway(nftUpgrade.nft.metadata.animation_url)} />
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