import React, { useState } from 'react'
import { Trans } from '@lingui/macro'
import { ChainId } from '@usedapp/core'
import { Bnb, Eth } from '@styled-icons/crypto'
import { depositFeeMP, withdrawFeeMP, gainsPerYearkMP } from '@config/transaction'
import Form from '@components/atoms/form/form'
import Button from '@components/atoms/button'
import Card from '@components/molecules/card'
import useWallet from '@components/organisms/web3/hooks/useWallet'
import InvestCardHeader from './invest-card-header'
import InvestRange from './invest-range-slider'
import InvestBalance from './invest-balance'
import WalletBalance from './wallet-balance'
import DailyInterest from './daily-interest'
import DailyRewards from './daily-rewards'
import InvestFee from './invest-fee'
import { InvestFormFields } from './types'

export interface DepositProps {
    title?: string,
    percentageRate?: number,
    assets?: object[],
    tvl?: number,
    deposited?: number,
    earned?: number,
    currency?: string,
}

const IconMap = {
    [ChainId.BSC]: Bnb,
    default: Eth
}

const Index = ({ title, deposited, percentageRate }: DepositProps) => {
    const wallet = useWallet()
    const etherBalance = Number(wallet.etherBalance || 0).toFixed(4) as any
    const [quickDepositPercentage, setQuickDepositPercentage] = useState(0)
    const [deposit, setDeposit] = useState<any | null>(0)
    const [fee, setFee] = useState<any | null>(0)
    const [gainsPerWeek, setGainsPerWeek] = useState<any | null>((Number((deposited * 0.00047) * gainsPerYearkMP) / 365 * 7).toFixed(8))
    const [gainsPerYear, setGainsPerYear] = useState<any | null>(Number((deposited * 0.00047) * gainsPerYearkMP).toFixed(8))
    const [newDeposit, setNewDeposit] = useState<any | null>(0);
    const [balance, setBalance] = useState(etherBalance)

    const handleSubmit = (values: InvestFormFields) => {
        alert(values.investBalance)
    }

    const handleDepositRange = value => {
        setNewDeposit(Number(value).toFixed(4))
        setBalance(Number(etherBalance - (newDeposit - deposit)).toFixed(4))
        calculateFee(value)

        setGainsPerYear(Number(value * gainsPerYearkMP).toFixed(8))
        setGainsPerWeek(Number((value * gainsPerYearkMP) / 365 * 7).toFixed(8))
    }

    const calculateFee = (value) => {
        let diff = 0 as any
        if (value > deposit) {
            diff = value - deposit
            setFee(Number(Number(parseFloat(diff)).toFixed(4) as any * depositFeeMP).toFixed(8))
            // withdraw ...
        } else {
            diff = Number(deposit - value)
            setFee(Number(Number(parseFloat(diff)).toFixed(4) as any * withdrawFeeMP).toFixed(8))
        }
    }

    const handleDepositInput = (e) => {
        let value = Number(e.target.value).toFixed(4) as any

        let diff = 0 as any

        // if its a deposit
        if (value > deposit) {
            diff = value - deposit
            const newBalance = Number(parseFloat(etherBalance) - parseFloat(diff)).toFixed(4)
            setBalance(newBalance)
            // withdraw ...
        } else {
            diff = Number(deposit - value)
            const newBalance = Number(parseFloat(etherBalance) + parseFloat(diff)).toFixed(4)
            setBalance(newBalance)
        }

        calculateFee(value)
        setNewDeposit(value)
    }

    const handleBalanceChange = (e) => {
        let value = Number(e.target.value).toFixed(4) as any
        let diff = 0 as any
        if (value > etherBalance) {
            setBalance(etherBalance)
        } else {
            diff = etherBalance - value
            setBalance(Number(parseFloat(etherBalance) - parseFloat(diff)).toFixed(4))
            const newDepositVal = Number(parseFloat(deposit) + parseFloat(diff)).toFixed(4)
            setNewDeposit(newDepositVal)
            calculateFee(newDepositVal)
        }
    }

    const handleQuickDeposit = (percentage) => {
        if (!(balance > 0)) {
            return false
        }
        const value = etherBalance * percentage / 100 as any
        setNewDeposit(Number(parseFloat(deposit) + parseFloat(value)).toFixed(4))
        if (quickDepositPercentage) {
            setBalance(Number(etherBalance - value).toFixed(4))
        } else {
            setBalance(Number(balance - value).toFixed(4))
        }
        setQuickDepositPercentage(percentage)
    }

    const initialValues: InvestFormFields = {
        investBalance: 0,
        walletBalance: 100,
        investRange: 0,
        dailyInterests: 0,
        dailyRewards: 0,
        investFee: 0,
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
                    <InvestCardHeader title={title} percentageRate={percentageRate} />
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

                        <Button variant="outline-success" className="w-100 mb-2" disabled={!initialValues.investBalance}>
                            <Trans>
                                {initialValues.submitAction}
                            </Trans>
                        </Button>
                        <InvestFee />
                    </Card.Body>
                </Card>
            </>
        </Form>
    )
}

export default Index
