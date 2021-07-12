import React from 'react'
import Modal from '@components/molecules/modal'
import InvestCard  from '@components/organisms/invest/invest-card'

export interface InvestModalProps {
    show?: boolean,
    onHide?: any,
    title?: string,
    percentageRate?: number,
    assets?: object[],
    tvl?: number,
    deposited?: number,
    earned?: number,
    currency?: string,
    setShowWalletProviderModal?: any
}

const InvestModal = ({ show, onHide, ...props}: InvestModalProps) => {

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton onHide={onHide} className="pb-0">
                Invest
            </Modal.Header>
            <Modal.Body className="pt-0">
                <InvestCard {...props} />
            </Modal.Body>
        </Modal>
    )
}

export default InvestModal
