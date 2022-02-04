import React from 'react'
import { useFormikContext } from 'formik'
import Icon from '@components/atoms/icon'
import { Search } from '@styled-icons/bootstrap'
import { investmentStrategies } from '@config/investment/strategies'
import { InvestListProps } from './types'
import {riskLabels} from "../../../locales";

export default function SearchForm() {
  const { values, setFieldValue } = useFormikContext<InvestListProps>()

  const handleChange = (e) => {
    let keywords = e.target.value

    if (keywords) {
      keywords = keywords.toLowerCase().split(' ')
      keywords = keywords.filter(f => f !== '')

      const nextStrategies = investmentStrategies.filter(f =>
        keywords.some(k => f.name.toLowerCase().includes(k.toLowerCase()))
        || keywords.some(k => f.type.toLowerCase().includes(k.toLowerCase()))
          || keywords.some(k => riskLabels[f.riskLevel].id.toLowerCase().includes(k.toLowerCase()))
        || keywords.some(k => f.interest.interestRate + f.rewards.rewardRate >= parseInt(k.toLowerCase()))
      )

      setFieldValue('search', keywords)
      setFieldValue('strategies', nextStrategies)
    } else {
      setFieldValue('search', keywords)
      setFieldValue('strategies', investmentStrategies)
    }
  }

  return (
    <div className="input-group input-group-flush input-group-merge">
        <span className="bg-transparent border form-control-rounded border-right-0 ps-4 pe-3 py-3 cursor-pointer">
            <Icon component={Search} size={18} />
        </span>
        <input
            className=" bg-transparent border form-control-rounded border-left-0 ps-3 pe-4 py-3 text-muted"
            type="search"
            placeholder="Search"
            value={values.search}
            onChange={handleChange}
        />
    </div>
  )
}
