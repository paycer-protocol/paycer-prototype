import React from 'react'
import { Trans } from '@lingui/macro'
import Modal from '@components/molecules/modal'
import InvestForm  from '@components/organisms/invest/invest-form'
import {useInvestList} from "@context/invest-list-context";

const InvestModal = () => {

    const {
        setStrategy,
        strategy,
        showFormModal
    } = useInvestList()

    if (!strategy) {
        return null
    }

    return (
        <Modal centered show onHide={() => setStrategy(null)}>
          <div className={`${!showFormModal ? 'd-none' : ''} bg-card-blue`}>
            <Modal.Header closeButton onHide={() => setStrategy(null)}>
                <Modal.Title><Trans>Invest</Trans></Modal.Title>
            </Modal.Header>
            <Modal.Body className="pt-0">
                <InvestForm />
            </Modal.Body>
          </div>
        </Modal>
    )
}

export default InvestModal
