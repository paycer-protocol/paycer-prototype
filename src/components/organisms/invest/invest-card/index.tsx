import React, { useState } from 'react'
import { Trans } from '@lingui/macro'
import { depositFeeMP, withdrawFeeMP, gainsPerYearkMP } from '@config/transaction'
import Form from '@components/atoms/form/form'
import Card from '@components/molecules/card'
import Button from '@components/atoms/button'
import useWallet from '@components/organisms/web3/hooks/useWallet'
import { ChainId } from '@usedapp/core'
import { Bnb, Eth } from '@styled-icons/crypto'
import InvestCardHeader from './invest-card-header'
import InvestRange from './invest-range-slider'
import InvestBalance from './invest-balance'
import WalletBalance from './wallet-balance'
import { InvestFormFields } from './types'

export interface DepositProps {
    deposited?: number,
}

const IconMap = {
    [ChainId.BSC]: Bnb,
    default: Eth
}

const Index = ({ deposited }: DepositProps) => {
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
        investFee: 0,
    }

    return (
        <Form
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            <>
                <Card className="shadow-none mb-0">
                    <InvestCardHeader />
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
                        <label className="form-label mb-3">
                            <Trans>Invest percentage of balance: </Trans>
                        </label>
                        <div className="row">
                            <div className="col-3">
                                <Button onClick={() => handleQuickDeposit(25)} variant={quickDepositPercentage === 25 ? 'primary w-100' : 'outline-secondary bg-transparent w-100'}>
                                    <Trans>25%</Trans>
                                </Button>
                            </div>
                            <div className="col-3">
                                <Button onClick={() => handleQuickDeposit(50)} variant={quickDepositPercentage === 50 ? 'primary w-100' : 'outline-secondary bg-transparent w-100'}>
                                    <Trans>50%</Trans>
                                </Button>
                            </div>
                            <div className="col-3">
                                <Button onClick={() => handleQuickDeposit(75)} variant={quickDepositPercentage === 75 ? 'primary w-100' : 'outline-secondary bg-transparent w-100'}>
                                    <Trans>75%</Trans>
                                </Button>
                            </div>
                            <div className="col-3">
                                <Button onClick={() => handleQuickDeposit(100)} variant={quickDepositPercentage === 100 ? 'primary w-100' : 'outline-secondary bg-transparent w-100'}>
                                    <Trans>100%</Trans>
                                </Button>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                <Card className="mt-4 shadow-none mb-0">
                    <Card.Body className="pb-0 pt-0">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex align-items-center text-secondary justify-content-between px-0">
                            <span>
                                <Trans>Gains per week</Trans>
                            </span>
                                {gainsPerWeek}
                            </li>
                            <li className="list-group-item d-flex align-items-center text-secondary justify-content-between px-0">
                            <span>
                                <Trans>Gains per year</Trans>
                            </span>
                                {gainsPerYear}
                            </li>
                            <li className="list-group-item d-flex align-items-center text-secondary justify-content-between px-0">
                                <span className=""><Trans>Fee</Trans></span>
                                {fee}
                            </li>
                        </ul>
                    </Card.Body>
                </Card>
                <Button
                    variant="success"
                    className="w-100 mt-4"
                    disabled={!initialValues.investBalance}
                >
                    <Trans>Invest</Trans>
                </Button>
            </>
        </Form>
    )
}

export default Index
