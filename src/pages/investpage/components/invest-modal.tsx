import React from 'react'
import Modal from '@components/molecules/modal'
import Transaction from './transaction'

export interface InvestModalProps {
    show?: boolean,
    title?: string,
    onHide?: any,
    deposited?: number
}

const InvestModal = (
    {
        show,
        title,
        onHide,
        deposited
    }: InvestModalProps) => {

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton onHide={onHide} className="pb-0">
                {title}
            </Modal.Header>
            <Modal.Body className="pt-0">
                <Transaction deposited={deposited} />
            </Modal.Body>
        </Modal>
    )
}

export default InvestModal
