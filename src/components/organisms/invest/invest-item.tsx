import React from 'react'
import {t, Trans} from '@lingui/macro'
import { Money, Percentage } from '@components/atoms/number'
import GradientButton from '@components/atoms/button/gradient-button'
import { StrategyType } from '../../../types/investment'
import { riskLabels } from '../../../locales'

import CurrencyIcon from "@components/atoms/currency-icon";
import {useInvestList} from "@context/invest-list-context";

interface InvestItemProps {
  strategy: StrategyType,
}

export default function InvestItem(props: InvestItemProps) {
  const { strategy } = props

  const {
    setInvestFormStrategy
  } = useInvestList()

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
          <GradientButton className="me-5" onClick={() => setInvestFormStrategy(strategy)}>
            <span>{t`Invest`}</span>
          </GradientButton>
          <GradientButton isInverted onClick={() => setInvestFormStrategy(strategy)}>
            <span className="bg-dark">
              {t`Withdraw`}
            </span>
          </GradientButton>
        </td>
      </tr>
    </>
  )
}
