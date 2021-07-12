import React from 'react'
import { Trans } from '@lingui/macro'
import { ChainId } from '@usedapp/core'
import { Bnb, Eth } from '@styled-icons/crypto'
import Form from '@components/atoms/form/form'
import Button from '@components/atoms/button'
import Card from '@components/molecules/card'
import InvestCardHeader from './invest-card-header'
import InvestRange from './invest-range-slider'
import InvestBalance from './invest-balance'
import WalletBalance from './wallet-balance'
import DailyInterest from './daily-interest'
import DailyRewards from './daily-rewards'
import InvestFee from './invest-fee'
import { InvestProps, InvestFormFields } from '../types'
import {BigNumber} from "@ethersproject/bignumber";

const IconMap = {
    [ChainId.BSC]: Bnb,
    default: Eth
}

const InvestForm = (props: InvestProps) => {
    const { investSymbol, rewardSymbol, investFee, withdrawFee, feeSymbol } = props
    const handleSubmit = (values: InvestFormFields) => {
        alert(values.investBalance)
    }

    const initialValues: InvestFormFields = {
        investBalance: 0,
        walletBalance: 100,
        dailyInterest: 0,
        dailyRewards: 0,
        investRange: 0,
        investSymbol,
        rewardSymbol,
        investFee,
        withdrawFee,
        feeSymbol,
        submitAction: 'invest'
    }

    return (
        <Form
            initialValues={initialValues}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            <>
                <Card className="shadow-none mb-0">
                    <InvestCardHeader {...props} />
                    <Card.Body>
                        <div className="mb-5">
                            <InvestRange />
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <InvestBalance />
                            </div>
                            <div className="col-6">
                                <WalletBalance />
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

                        <Button
                            variant="outline-success"
                            className="w-100 mb-2"
                            disabled={!initialValues.investBalance}
                        >
                            <Trans>
                                {initialValues.submitAction}
                            </Trans>
                        </Button>
                        <InvestFee {...props} />
                    </Card.Body>
                </Card>
            </>
        </Form>
    )
}

export default InvestForm
