import React, { useState } from 'react'
import { Trans } from '@lingui/macro'
import Card from '@components/molecules/card'
import Button from '@components/atoms/button'

export interface WithdrawProps {
}

const Withdraw = (
  {
  }: WithdrawProps) => {
  const currentDeposit = 0.2
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
          <Trans>Available</Trans>
          :&nbsp;
          <strong>{currentDeposit}</strong>
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
          </ul>
        </Card.Body>
      </Card>
    </>
  )
}

export default Withdraw