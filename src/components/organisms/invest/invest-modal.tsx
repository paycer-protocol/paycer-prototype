import React from 'react'
import { t } from '@lingui/macro'
import Modal from '@components/molecules/modal'
import DepositForm  from '@components/organisms/invest/deposit-form'
import WithdrawForm  from '@components/organisms/invest/withdraw-form'
import {useInvestList} from "@context/invest-list-context";

const InvestModal = () => {

    const {
        setStrategy,
        strategy,
        showFormModal,
        investType
    } = useInvestList()

    if (!strategy) {
        return null
    }

    return (
        <Modal centered show onHide={() => setStrategy(null)}>
          <div className={`${!showFormModal ? 'd-none' : ''} bg-card-blue`}>
            <Modal.Header closeButton onHide={() => setStrategy(null)}>
                <Modal.Title>
                    {investType === 'deposit' ? t`Deposit:` : t`Withdraw:`}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="pt-0">
                {investType === 'deposit' ? <DepositForm /> : <WithdrawForm />}
            </Modal.Body>
          </div>
        </Modal>
    )
}

export default InvestModal
