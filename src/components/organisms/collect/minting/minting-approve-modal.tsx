import TransactionApproveModal from "@components/organisms/transaction-approve-modal";
import { Trans } from "@lingui/macro";
import { useCallback } from "react";

export interface MintingApproveModalProps {
    show: boolean;
    onHide: () => void;
}

const MintingApproveModal = ({ show, onHide }: MintingApproveModalProps) => {
    const onMint = useCallback(async () => {
    }, []);

    return (
        <TransactionApproveModal
            show={show}
            onHide={onHide}
            onClick={onMint}
        >
            <Trans>Are you sure you want to mint this NFT?</Trans>
        </TransactionApproveModal>
    );
}

export default MintingApproveModal;