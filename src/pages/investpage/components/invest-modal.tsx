import React from 'react'
import Modal from '@components/molecules/modal';
import InvestModalContent from './invest-modal-content';

export interface InvestModalProps {
    show?: boolean,
    title?: string,
    onHide?: any
}

const InvestModal = (
    {
        show,
        title,
        onHide
    }: InvestModalProps) => {

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton onHide={onHide} className="pb-0">
                {title}
            </Modal.Header>
            <Modal.Body className="pt-0">
                <InvestModalContent />
            </Modal.Body>
        </Modal>
    )
}

export default InvestModal
