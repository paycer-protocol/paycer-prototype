import React from 'react'
import { Trans } from '@lingui/macro'
import Modal from '@components/molecules/modal'
import InvestForm  from '@components/organisms/invest/invest-form'
import { StrategyType } from '../../../types/investment'
import {useInvestList} from "@context/invest-list-context";

const InvestModal = () => {

    const {
        setInvestFormStrategy,
        investFormStrategy
    } = useInvestList()

    if (!investFormStrategy) {
        return null
    }

    return (
        <Modal show onHide={() => setInvestFormStrategy(null)}>
          <>
            <Modal.Header closeButton onHide={() => setInvestFormStrategy(null)} className="pb-0">
                <Trans>Invest</Trans>
            </Modal.Header>
            <Modal.Body className="pt-0">
                <InvestForm />
            </Modal.Body>
          </>
        </Modal>
    )
}

export default InvestModal
