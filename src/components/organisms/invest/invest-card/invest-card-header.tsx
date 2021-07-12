import React from 'react'
import {Trans} from '@lingui/macro'
import { useFormikContext } from 'formik'
import Card from '@components/molecules/card'
import { InvestFormFields } from './types'

export default function InvestCardHeader() {
    const { values } = useFormikContext<InvestFormFields>()

    return (
        <Card.Header>
            <div className="row justify-content-between">
                <div className="col-6">
                    <div className="d-flex align-items-center">
                        <strong><Trans>Current Invest</Trans></strong>:&nbsp;&nbsp;
                        <span className="text-invest">{values.investBalance}</span>
                    </div>
                </div>
                <div className="col-6 pr-0 justify-content-end">
                    <div className="d-flex align-items-center">
                        <strong><Trans>Available Balance</Trans></strong>:&nbsp;&nbsp;
                        <span className="text-secondary">{values.walletBalance}</span>
                    </div>
                </div>
            </div>
        </Card.Header>
    )
}
