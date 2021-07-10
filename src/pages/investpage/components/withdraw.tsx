import React, { useState } from 'react'
import { Trans } from '@lingui/macro'
import Card from '@components/molecules/card'
import Button from '@components/atoms/button'
import Icon from "@components/atoms/icon";
import {ChainId} from "@usedapp/core";
import {Bnb, Eth} from "@styled-icons/crypto";
import useWallet from "@components/organisms/web3/hooks/useWallet";

export interface WithdrawProps {
}

const IconMap = {
  [ChainId.BSC]: Bnb,
  default: Eth
}

const Withdraw = (
  {
  }: WithdrawProps) => {
  const wallet = useWallet()
  const etherBalance = Number(wallet.etherBalance || 0).toFixed(4)
  const iconComponent = IconMap[wallet.chainName] || IconMap.default
  const currentDeposit = 50
  const withDrawRewardsDivider = 10
  const feeDivider = 40

  const [quickWithdrawPercentage, setQuickWithdrawPercentage] = useState(0)
  const [withdrawFee, setWithdrawFee] = useState(0)
  const [withdrawRewards, setWithdrawRewards] = useState(0)
  const [withdrawValue, setWithdrawValue] = useState(0)

  const handleWithdrawSubmit = () => {
    alert(withdrawValue)
  }

  const handleChange = (e) => {
    let value = e.target.value
    setWithdrawValue(value)
    setWithdrawFee( value / feeDivider)
    setWithdrawRewards(value / withDrawRewardsDivider)
  }

  const handleQuickWithdraw = (percentage) => {
    const value = currentDeposit * percentage / 100
    setWithdrawValue(value)
    setQuickWithdrawPercentage(percentage)
    setWithdrawFee( value / feeDivider)
    setWithdrawRewards(value / withDrawRewardsDivider)
  }

  return (
    <>
      <Card className="shadow-none mb-0">
        <Card.Header className="font-size-lg">
          <div className="d-flex align-items-center">
            <strong><Trans>Current Invest</Trans></strong>:&nbsp;&nbsp;
            <span className="text-success">{currentDeposit}</span>
            <div className="m-lg-3">
              <Icon component={iconComponent} size={28} />
            </div>
          </div>
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
            <input value={withdrawValue} onChange={handleChange} type="number" className="form-control mb-5" placeholder="Form control" />
            <input value={withdrawValue} onChange={handleChange} step="0.01" type="range" className="mb-5" min="0" max={currentDeposit} placeholder="Form control" />
            <div className="row mb-5">
              <div className="col-3">
                <Button onClick={() => handleQuickWithdraw(25)} variant={quickWithdrawPercentage === 25 ? 'primary w-100' : 'outline-primary w-100'}>
                  <Trans>25%</Trans>
                </Button>
              </div>
              <div className="col-3">
                <Button onClick={() => handleQuickWithdraw(50)} variant={quickWithdrawPercentage === 50 ? 'primary w-100' : 'outline-primary w-100'}>
                  <Trans>50%</Trans>
                </Button>
              </div>
              <div className="col-3">
                <Button onClick={() => handleQuickWithdraw(75)} variant={quickWithdrawPercentage === 75 ? 'primary w-100' : 'outline-primary w-100'}>
                  <Trans>75%</Trans>
                </Button>
              </div>
              <div className="col-3">
                <Button onClick={() => handleQuickWithdraw(100)} variant={quickWithdrawPercentage === 100 ? 'primary w-100' : 'outline-primary w-100'}>
                  <Trans>100%</Trans>
                </Button>
              </div>
            </div>
          </div>
          <Button onClick={() => handleWithdrawSubmit()} variant="outline-primary" className={!withdrawValue ? 'disabled w-100' : 'w-100'}>
            <Trans>Withdraw</Trans>
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
              <span className=""><Trans>Rewards</Trans></span>
              {withdrawRewards}
            </li>
            <li className="list-group-item d-flex align-items-center justify-content-between px-0">
              <span className=""><Trans>Fee</Trans></span>
              {withdrawFee}
            </li>
            <li className="list-group-item d-flex align-items-center justify-content-between px-0">
              <span className=""><Trans>Invest after</Trans></span>
              {withdrawValue > 0 ? currentDeposit - withdrawValue : ''}
            </li>
            <li className="list-group-item d-flex align-items-center justify-content-between px-0">
              <span className=""><Trans>Balance after</Trans></span>
              {withdrawValue > 0 ? withdrawValue + parseFloat(etherBalance): ''}
            </li>
          </ul>
        </Card.Body>
      </Card>
    </>
  )
}

export default Withdraw