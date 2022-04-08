import TransactionApproveModal from "@components/organisms/transaction-approve-modal";
import useMint from "@hooks/nft/use-mint";
import { t, Trans } from "@lingui/macro";
import { useCallback } from "react";

export interface MintingApproveModalProps {
    show: boolean;
    onHide: () => void;
}

const MintingApproveModal = ({ show, onHide }: MintingApproveModalProps) => {
    const { mint, status, resetState } = useMint();

    return (
        <TransactionApproveModal
            show={show}
            onHide={() => { resetState(); onHide(); }}
            onClick={mint}
            title={t`Confirm Mint`}
            btnLabel={t`Mint now`}
            loading={status === 'loading'}
            error={status === 'error'}
            success={status === 'success'}
            successMessage={t`NFT was minted successfully`}
        >
            <p className="text-center">{t`Are you sure you want to mint this NFT?`}</p>
        </TransactionApproveModal>
    );
}

export default MintingApproveModal;