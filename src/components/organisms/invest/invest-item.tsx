import React from 'react'
import {t, Trans} from '@lingui/macro'
import { Money, Percentage } from '@components/atoms/number'
import GradientButton from '@components/atoms/button/gradient-button'
import { StrategyType } from '../../../types/investment'
import { riskLabels } from '../../../locales'
import CurrencyIcon from '@components/atoms/currency-icon'
import {useInvestList} from '@context/invest-list-context'
import useInvestIsWithdrawable from '@hooks/use-invest-is-withdrawable'

export default function InvestItem(strategy: StrategyType) {
  const { setStrategy, setInvestType } = useInvestList()
  const { isWithdrawAble } = useInvestIsWithdrawable(strategy)
  const tdClass = 'bg-dark border border-purple-dark'

  return (
    <tr>
      <td className={`${tdClass} card-border-top-left-radius card-border-bottom-left-radius border-right-0`}>
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
      <td className={`${tdClass} border-left-0 border-right-0`}>
          {/*@ts-ignore  */}
        <Trans id={riskLabels[strategy.riskLevel].id}/>
      </td>
      <td className={`${tdClass} border-left-0 border-right-0`}>
        <Percentage value={strategy.rewards.rewardRate / 100} />
      </td>
      <td className={`${tdClass} border-left-0 border-right-0`}>
        <Percentage value={strategy.interest.interestRate / 100} />
      </td>
      <td className={`${tdClass} border-left-0 border-right-0`}>
        <Money value={0} />
      </td>
      <td className={`${tdClass} card-border-top-right-radius card-border-bottom-right-radius ps-0 pe-0 border-left-0 pt-0 pb-0`}>
          <div className="d-flex justify-content-end">
            <GradientButton className="me-4" onClick={() => {
              setInvestType('deposit')
              setStrategy(strategy)
            }}>
              <span>{t`Invest`}</span>
            </GradientButton>
            <GradientButton className="me-4" disabled={!isWithdrawAble} isInverted onClick={() => {
              if (isWithdrawAble) {
                setInvestType('withdraw')
                setStrategy(strategy)
              }
            }}>
              <span className="bg-dark">{t`Withdraw`}</span>
            </GradientButton>
          </div>
      </td>
    </tr>
  )
}
