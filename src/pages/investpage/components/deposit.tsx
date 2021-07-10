import React, { useState } from 'react'
import { Trans } from '@lingui/macro'
import Card from '@components/molecules/card'
import Button from '@components/atoms/button'
import useWallet from '@components/organisms/web3/hooks/useWallet'
import {ChainId} from "@usedapp/core";
import {Bnb, Eth} from "@styled-icons/crypto";
import Icon from "@components/atoms/icon";

export interface DepositProps {
}

const IconMap = {
    [ChainId.BSC]: Bnb,
    default: Eth
}

const Deposit = (
    {
    }: DepositProps) => {
    const wallet = useWallet()
    const etherBalance = Number(wallet.etherBalance || 0).toFixed(4)
    const iconComponent = IconMap[wallet.chainName] || IconMap.default
    const feeDivider = 44
    const gainsPerMonthDivider = 10
    const [quickDepositPercentage, setQuickDepositPercentage] = useState(0)
    const [depositFee, setDepositFee] = useState(0)
    const [depositGains, setDepositGains] = useState(0)
    const [depositValue, setDepositValue] = useState(0)

    const handleDepositSubmit = () => {
        alert(depositValue)
    }

    const handleChange = (e) => {
        let value = e.target.value
        if (value > etherBalance) {
            value = etherBalance
        }
        setDepositValue(value)
        setDepositFee(value / feeDivider)
        setDepositGains(value / gainsPerMonthDivider)
    }

    const handleQuickDeposit = (percentage) => {
        const value = etherBalance * percentage / 100
        setDepositValue(value)
        setQuickDepositPercentage(percentage)
        setDepositFee(value / feeDivider)
        setDepositGains(value / gainsPerMonthDivider)
    }

    return (
        <>
            <Card className="shadow-none mb-0">
                <Card.Header className="font-size-lg">
                    <div className="d-flex align-items-center">
                        <strong><Trans>Balance</Trans></strong>:&nbsp;&nbsp;
                        <span className="text-success">{etherBalance}</span>
                        <div className="m-lg-3">
                            <Icon component={iconComponent} size={28} />
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className="mb-5">
                        <input value={depositValue} onChange={handleChange} type="number" className="form-control mb-5" placeholder="Form control" />
                        <input value={depositValue} onChange={handleChange} step="0.01" type="range" className="mb-5" min="0" max={etherBalance} placeholder="Form control" />
                        <div className="row mb-5">
                            <div className="col-3">
                                <Button onClick={() => handleQuickDeposit(25)} variant={quickDepositPercentage === 25 ? 'primary w-100' : 'outline-primary w-100'}>
                                    <Trans>25%</Trans>
                                </Button>
                            </div>
                            <div className="col-3">
                                <Button onClick={() => handleQuickDeposit(50)} variant={quickDepositPercentage === 50 ? 'primary w-100' : 'outline-primary w-100'}>
                                    <Trans>50%</Trans>
                                </Button>
                            </div>
                            <div className="col-3">
                                <Button onClick={() => handleQuickDeposit(75)} variant={quickDepositPercentage === 75 ? 'primary w-100' : 'outline-primary w-100'}>
                                    <Trans>75%</Trans>
                                </Button>
                            </div>
                            <div className="col-3">
                                <Button onClick={() => handleQuickDeposit(100)} variant={quickDepositPercentage === 100 ? 'primary w-100' : 'outline-primary w-100'}>
                                    <Trans>100%</Trans>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <Button onClick={() => handleDepositSubmit()} variant="outline-primary" className={!depositValue ? 'disabled w-100' : 'w-100'}>
                        <Trans>Deposit</Trans>
                    </Button>
                </Card.Body>
            </Card>
            <Card className="mt-4 shadow-none mb-0">
                <Card.Header className="font-size-lg">
                    <Trans>Summary</Trans>
                </Card.Header>
                <Card.Body className="pb-0 pt-0">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex align-items-center justify-content-between px-0">
                            <span className=""><Trans>Gains/Month</Trans></span>
                            {depositGains}
                        </li>
                        <li className="list-group-item d-flex align-items-center justify-content-between px-0">
                            <span className=""><Trans>Fee</Trans></span>
                            {depositFee}
                        </li>
                        <li className="list-group-item d-flex align-items-center justify-content-between px-0">
                            <span className=""><Trans>Balance after</Trans></span>
                            {depositValue > 0 ? etherBalance - depositValue - depositFee : 0}
                        </li>
                    </ul>
                </Card.Body>
            </Card>
        </>
    )
}

export default Deposit
