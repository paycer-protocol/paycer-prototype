import React, {useState} from 'react'
import {t, Trans} from '@lingui/macro'
import Button from '@components/atoms/button'
import { Money, Percentage } from '@components/atoms/number'
import { StrategyType } from '../../../types/investment'
import { riskLabels } from '../../../locales'
import InvestForm  from '@components/organisms/invest/invest-form'

interface InvestItemProps {
  strategy: StrategyType
}


export default function InvestItem(props: InvestItemProps) {
  const [showForm, setShowForm] = useState(false)
  const { strategy } = props
  const interest = strategy.interest.interestRate + strategy.rewards.rewardRate
  const tdClass = showForm ? 'bg-dark' : ''

  return (
    <>
      <tr>
        <td className={tdClass}>
          <div className="d-flex align-items-center">
            <img
              src={strategy.assets[0].imgPath}
              alt={strategy.assets[0].name}
              width={35}
              height={35}
              className="me-3"
            />
            <strong className="font-size-lg">{strategy.name}</strong>
          </div>
        </td>
        <td className={tdClass}>
          <Trans id={riskLabels[strategy.riskLevel].id}/>
        </td>
        <td className={tdClass}>
          <div className="row align-items-center g-0">
            <div className="col-auto me-3">
              <Percentage
                value={0}
                className="mb-2"
              />
            </div>
          </div>
        </td>
        <td className={tdClass}>
          <Percentage value={interest / 100} />
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
              isModal={false}
            />
          </td>
        </tr>
      )}
    </>
  )
}
