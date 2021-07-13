import React from 'react'
import { Trans } from '@lingui/macro'
import Form from '@components/atoms/form/form'
import Button from '@components/atoms/button'
import Card from '@components/molecules/card'
import InvestCardHeader from './invest-card-header'
import InvestRangeSlider from './fields/invest-range-slider'
import InvestInput from './fields/invest-input'
import BaseInput from './fields/base-Input'
import SubmitButton from './fields/submit-button'
import DailyInterest from './daily-interest'
import DailyRewards from './daily-rewards'
import InvestFee from './invest-fee'
import { InvestProps, InvestFormFields } from '../types'


const InvestForm = (props: InvestProps) => {
    const {
        // invest pairs
        baseSymbol,
        baseBalance,
        investSymbol,
        investBalance,
        // interest
        interestRate,
        earnedInterest,
        // rewards
        rewardSymbol,
        rewardRate,
        earnedReward,
        // fees
        feeSymbol,
        withdrawFee,
        investFee,
    } = props

    const handleSubmit = (values: InvestFormFields) => {
        alert(values.investBalance)
    }

    const initialValues: InvestFormFields = {
        // invest pairs
        baseSymbol,
        baseBalance: 100,
        investSymbol,
        investBalance: 100,

        // interest
        interestRate,
        earnedInterest,
        dailyInterest: 0, // TODO:

        // rewards
        rewardSymbol,
        rewardRate,
        earnedReward,
        dailyRewards: 0, // TODO:

        // fees
        feeSymbol,
        withdrawFee: 0, // TODO:
        investFee: 0, // TODO:

        // form
        investRange: 0,
        submitAction: 'invest'
    }

    return (
        <Form
            initialValues={initialValues}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            <Card className="shadow-none mb-0">
                <InvestCardHeader {...props} />
                <Card.Body>
                    <div className="mb-5">
                        <InvestRangeSlider />
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <InvestInput />
                        </div>
                        <div className="col-6">
                            <BaseInput />
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-6">
                            <DailyInterest />
                        </div>
                        <div className="col-6">
                            <DailyRewards />
                        </div>
                    </div>
                    <SubmitButton />
                    <InvestFee {...props} />
                </Card.Body>
            </Card>
        </Form>
    )
}

export default InvestForm
