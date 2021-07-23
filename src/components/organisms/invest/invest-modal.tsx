import React from 'react'
import { Trans } from '@lingui/macro'
import Modal from '@components/molecules/modal'
import InvestForm  from '@components/organisms/invest/invest-form'
import { InvestmentStrategy } from '../../../types/investment'

interface InvestModalProps {
    show?: boolean,
    onHide?: any,
}

const InvestModal = ({ show, onHide, ...props}: InvestModalProps & InvestmentStrategy) => {
    return (
        <Modal show={show} onHide={onHide}>
          <>
            <Modal.Header closeButton onHide={onHide} className="pb-0">
                <Trans>Invest</Trans>
            </Modal.Header>
            <Modal.Body className="pt-0">
                <InvestForm {...props} />
            </Modal.Body>
          </>
        </Modal>
    )
}

export default InvestModal
