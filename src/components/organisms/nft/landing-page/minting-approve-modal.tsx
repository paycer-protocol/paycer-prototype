import TransactionApproveModal from '@components/organisms/transaction-approve-modal'
import useNftSale from '@hooks/nft/use-nft-sale'
import { t } from '@lingui/macro'
import { useCallback } from 'react'

export interface MintingApproveModalProps {
  amount: number;
  publicSaleStarted: boolean;
  alloc: number | undefined;
  merkleProof: string[] | undefined;
  show: boolean;
  onHide: () => void;
}

const MintingApproveModal = ({ amount, publicSaleStarted, alloc, merkleProof, show, onHide }: MintingApproveModalProps) => {
  const nftPresale = useNftSale('presale')
  const nftPublicSale = useNftSale('publicSale')

  const onMintClicked = useCallback(() => {
    if (publicSaleStarted) {
      nftPublicSale.buy(amount)
    } else {
      nftPresale.buy(amount, alloc, merkleProof)
    }
  }, [nftPresale, nftPublicSale, amount, publicSaleStarted])

  return (
    <TransactionApproveModal
      show={show}
      onHide={() => { nftPresale.resetState(); nftPublicSale.resetState(); onHide() }}
      onClick={onMintClicked}
      title={t`Confirm Mint`}
      btnLabel={t`Mint now`}
      loading={nftPresale.status === 'loading' || nftPublicSale.status === 'loading'}
      error={(nftPresale.status === 'error' || nftPublicSale.status === 'error') ? new Error('Something went wrong') : null}
      success={nftPresale.status === 'success' || nftPublicSale.status === 'success'}
      successMessage={t`NFT was minted successfully`}
    >
      {
                amount == 1
                  ? <p className="text-center">{t`You are about to mint an NFT. Are you ready?`}</p>
                  : <p className="text-center">{t`You are about to mint ${amount} NFTs. Are you ready?`}</p>
            }
    </TransactionApproveModal>
  )
}

export default MintingApproveModal
