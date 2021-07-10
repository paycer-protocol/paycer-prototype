import React, { useState } from 'react'
import { Trans } from '@lingui/macro'
import Deposit from './deposit'
import Withdraw from './withdraw'

export interface InvestModalContentProps {
}

const InvestModalContent = (
    {
    }: InvestModalContentProps) => {

    const [showDeposit, setShowDeposit] = useState(true)
    const [showWithdraw, setShowWithdraw] = useState(false)

    return (
        <div>
            <ul className="nav nav-tabs nav-tabs-sm mb-4">
                <li className="nav-item font-size-lg w-50 m-0 text-center">
                    <a href="#" onClick={() => {
                        setShowDeposit(true)
                        setShowWithdraw(false)
                    }

                    } className={showDeposit ? 'nav-link active' : 'nav-link'}>
                        <Trans>Deposit</Trans>
                    </a>
                </li>
                <li className="nav-item font-size-lg w-50 m-0 text-center">
                    <a href="#" onClick={() => {
                        setShowDeposit(false)
                        setShowWithdraw(true)
                    }

                    } className={showWithdraw ? 'nav-link active' : 'nav-link'}>
                        <Trans>Withdraw</Trans>
                    </a>
                </li>
            </ul>
            {showDeposit ? <Deposit /> : <Withdraw />}
        </div>
    )
}

export default InvestModalContent
