import React, {useState} from 'react'
import {t, Trans} from '@lingui/macro'
import Button from '@components/atoms/button'
import { Money, Percentage } from '@components/atoms/number'
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
  const tdClass = 'bg-dark'

  return (
    <>
      <tr>
        <td className={tdClass}>
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
        <td className={tdClass}>
          <Trans id={riskLabels[strategy.riskLevel].id}/>
        </td>
        <td className={tdClass}>
          <Percentage value={strategy.rewards.rewardRate / 100} />
        </td>
        <td className={tdClass}>
          <Percentage value={strategy.interest.interestRate / 100} />
        </td>
        <td className={tdClass}>
          <Money value={0} />
        </td>
        <td className={tdClass}>
          <Button onClick={() => setShowForm(!showForm)} active={showForm} variant="primary">
            {showForm ? t`Hide` : t`Show`}
          </Button>
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
