import React, {useState} from 'react'
import {t, Trans} from '@lingui/macro'
import Button from '@components/atoms/button'
import { Money, Percentage } from '@components/atoms/number'
import GradientButton from '@components/atoms/button/gradient-button'
import { StrategyType } from '../../../types/investment'
import { riskLabels } from '../../../locales'
import InvestForm  from '@components/organisms/invest/invest-form'
import CurrencyIcon from "@components/atoms/currency-icon";

interface InvestItemProps {
  strategy: StrategyType,
}


export default function InvestItem(props: InvestItemProps) {
  const [showForm, setShowForm] = useState(false)
  const { strategy } = props

  return (
    <>
      <tr>
        <td className="mb-3 bg-dark card-border-top-left-radius card-border-bottom-left-radius">
          <div className="d-flex align-items-center">
            <CurrencyIcon
                symbol={strategy.input.symbol}
                className="me-3 pe-1 position-relative"
                style={{top: '-1px'}}
                width={30}
                height={30}
            />
            <strong className="font-size-lg">{strategy.name}</strong>
          </div>
        </td>
        <td className="mb-3 bg-dark">
          <Trans id={riskLabels[strategy.riskLevel].id}/>
        </td>
        <td className="mb-3 bg-dark">
          <Percentage value={strategy.rewards.rewardRate / 100} />
        </td>
        <td className="mb-3 bg-dark">
          <Percentage value={strategy.interest.interestRate / 100} />
        </td>
        <td className="mb-3 bg-dark">
          <Money value={0} />
        </td>
        <td className="mb-3 bg-dark card-border-top-right-radius card-border-bottom-right-radius ps-0 pe-0">
          <GradientButton className="me-5" onClick={() => setShowForm(!showForm)}>
            <span>{t`Invest`}</span>
          </GradientButton>
          <GradientButton isInverted onClick={() => setShowForm(!showForm)}>
            <span className="bg-dark">
              {t`Withdraw`}
            </span>
          </GradientButton>
        </td>
      </tr>
      {showForm && (
        <tr>
          <td colSpan={6}>
            <InvestForm
              {...strategy}
              className="border-0"
              setShowInvestForm={setShowForm}
            />
          </td>
        </tr>
      )}
    </>
  )
}
