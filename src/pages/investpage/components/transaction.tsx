import React, { useEffect, useState } from 'react'
import { Trans } from '@lingui/macro'
import Slider, { Range } from 'rc-slider';

import { depositFeeMP, withdrawFeeMP, gainsPerYearkMP } from '../../../config/transaction'
import Card from '@components/molecules/card'
import Button from '@components/atoms/button'
import useWallet from '@components/organisms/web3/hooks/useWallet'
import {ChainId} from '@usedapp/core'
import {Bnb, Eth} from '@styled-icons/crypto'
import Icon from '@components/atoms/icon'

export interface DepositProps {
    deposited?: number,
}

const IconMap = {
    [ChainId.BSC]: Bnb,
    default: Eth
}

const Transaction = (
    {
        deposited
    }: DepositProps) => {
    const wallet = useWallet()
    const iconComponent = IconMap[wallet.chainName] || IconMap.default
    const [quickDepositPercentage, setQuickDepositPercentage] = useState(0)
    const [fee, setFee] = useState<any | null>(0)
    const [deposit, setDeposit] = useState<any | null>(Number(deposited * 0.00047).toFixed(4));
    const [gainsPerWeek, setGainsPerWeek] = useState<any | null>((Number((deposited * 0.00047) * gainsPerYearkMP) / 365 * 7).toFixed(8))
    const [gainsPerYear, setGainsPerYear] = useState<any | null>(Number((deposited * 0.00047) * gainsPerYearkMP).toFixed(8))
    const etherBalance = Number(wallet.etherBalance || 0).toFixed(4) as any
    const [newDeposit, setNewDeposit] = useState<any | null>(0);
    const [balance, setBalance] = useState(etherBalance)

    const handleDepositSubmit = () => {
        alert(deposit)
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

    return (
        <>
            <Card className="shadow-none mb-0">
                <Card.Header className="">
                    <div className="row justify-content-between">
                        <div className="col-6">
                            <div className="d-flex align-items-center">
                                <strong><Trans>Current Invest</Trans></strong>:&nbsp;&nbsp;
                                <span className="text-invest">{deposit}</span>
                                <div className="m-lg-3">
                                    <Icon component={iconComponent} size={28} />
                                </div>
                            </div>
                        </div>
                        <div className="col-6 pr-0 justify-content-end">
                            <div className="d-flex align-items-center">
                                <strong><Trans>Available Balance</Trans></strong>:&nbsp;&nbsp;
                                <span className="text-balance">{etherBalance}</span>
                                <div className="m-lg-3">
                                    <Icon component={iconComponent} size={28} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>

                    <div className="mb-5">
                        <Slider
                            maximumTrackStyle={{
                                backgroundColor: "#93efff",
                                height: 7,
                            }}
                            trackStyle={{
                                background: "#c1ff93",
                                height: 7,
                            }}
                            handleStyle={{
                                height: 20,
                                width: 20,
                                marginTop: -7,
                                backgroundColor: "#FFFFFF",
                                border: 0
                            }}
                            min={0}
                            max={deposit ? parseFloat(deposit) + parseFloat(etherBalance) : etherBalance}
                            step={0.0001}
                            value={newDeposit ? newDeposit : deposit}
                            onChange={handleDepositRange}
                        />
                    </div>

                    <div className="row">
                        <div className="col-6">
                            <label className="form-label">
                                <Trans>Invest</Trans>
                            </label>
                            <input
                                value={newDeposit ? newDeposit : deposit}
                                onChange={handleDepositInput}
                                type="number"
                                className="form-control mb-5 border-primary text-invest bg-transparent"
                                placeholder="Form control"
                            />
                        </div>
                        <div className="col-6">
                            <label className="form-label">
                                Balance
                            </label>
                            <input
                                value={balance}
                                onChange={handleBalanceChange}
                                type="number"
                                className="form-control mb-5 border-primary text-balance bg-transparent"
                                placeholder="Form control"
                            />
                        </div>
                    </div>

                    <label className="form-label mb-3">
                        <Trans>Invest percentage of balance: </Trans>
                    </label>
                    <div className="row">
                        <div className="col-3">
                            <Button onClick={() => handleQuickDeposit(25)} className="text-balance" variant={quickDepositPercentage === 25 ? 'primary w-100' : 'outline-primary bg-transparent w-100'}>
                                <Trans>25%</Trans>
                            </Button>
                        </div>
                        <div className="col-3">
                            <Button onClick={() => handleQuickDeposit(50)} className="text-balance" variant={quickDepositPercentage === 50 ? 'primary w-100' : 'outline-primary bg-transparent w-100'}>
                                <Trans>50%</Trans>
                            </Button>
                        </div>
                        <div className="col-3">
                            <Button onClick={() => handleQuickDeposit(75)} className="text-balance" variant={quickDepositPercentage === 75 ? 'primary w-100' : 'outline-primary bg-transparent w-100'}>
                                <Trans>75%</Trans>
                            </Button>
                        </div>
                        <div className="col-3">
                            <Button onClick={() => handleQuickDeposit(100)} className="text-balance" variant={quickDepositPercentage === 100 ? 'primary w-100' : 'outline-primary bg-transparent w-100'}>
                                <Trans>100%</Trans>
                            </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
            <Card className="mt-4 shadow-none mb-0">
                <Card.Body className="pb-0 pt-0">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex align-items-center justify-content-between px-0">
                            <span>
                                <Trans>Gains per week</Trans>
                            </span>
                            {gainsPerWeek}
                        </li>
                        <li className="list-group-item d-flex align-items-center justify-content-between px-0">
                            <span>
                                <Trans>Gains per year</Trans>
                            </span>
                            {gainsPerYear}
                        </li>
                        <li className="list-group-item d-flex align-items-center justify-content-between px-0">
                            <span className=""><Trans>Fee</Trans></span>
                            {fee}
                        </li>
                    </ul>
                </Card.Body>
            </Card>
            <Button onClick={() => handleDepositSubmit()} variant="primary mt-4" className={!deposit ? 'disabled w-100' : 'w-100'}>
                <Trans>Invest</Trans>
            </Button>
        </>
    )
}

export default Transaction
