import TransactionApproveModal from "@components/organisms/transaction-approve-modal";
import useNftPresale from "@hooks/nft/use-nft-presale";
import useNftPublicSale from "@hooks/nft/use-nft-public-sale";
import { t } from "@lingui/macro";
import { useCallback } from "react";

export interface MintingApproveModalProps {
    amount: number;
    publicSaleStarted: boolean;
    show: boolean;
    onHide: () => void;
}

const MintingApproveModal = ({ amount, publicSaleStarted, show, onHide }: MintingApproveModalProps) => {
    const nftPresale = useNftPresale();
    const nftPublicSale = useNftPublicSale();

    console.log(nftPresale);
    console.log(nftPublicSale);

    const onMintClicked = useCallback(() => {
        if (publicSaleStarted) {
            nftPublicSale.buy(amount);
        } else {
            nftPresale.buy(amount);
        }
    }, [nftPresale, nftPublicSale, amount, publicSaleStarted])

    return (
        <TransactionApproveModal
            show={show}
            onHide={() => { nftPresale.resetState(); nftPublicSale.resetState(); onHide(); }}
            onClick={onMintClicked}
            title={t`Confirm Mint`}
            btnLabel={t`Mint now`}
            loading={nftPresale.status === 'loading' || nftPublicSale.status === 'loading'}
            error={nftPresale.status === 'error' || nftPublicSale.status === 'error'}
            success={nftPresale.status === 'success' || nftPublicSale.status === 'success'}
            successMessage={t`NFT was minted successfully`}
        >
            {
                amount == 1
                    ? <p className="text-center">{t`You are about to mint an NFT. Are you ready?`}</p>
                    : <p className="text-center">{t`You are about to mint ${amount} NFTs. Are you ready?`}</p>
            }
        </TransactionApproveModal>
    );
}

export default MintingApproveModal;