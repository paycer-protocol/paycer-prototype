import React from 'react'
import { useFormikContext } from 'formik'
import Icon from '@components/atoms/icon'
import { Search } from '@styled-icons/bootstrap'
import { investmentStrategies } from '@config/investment/strategies'
import { InvestListProps } from './types'

export default function SearchForm() {
  const { values, setFieldValue } = useFormikContext<InvestListProps>()

  const handleChange = (e) => {
    let keywords = e.target.value

    if (keywords) {
      keywords = keywords.toLowerCase().split(' ')
      keywords = keywords.filter(f => f !== '')

      const nextStrategies = investmentStrategies.filter(f => keywords.some(k => f.name.toLowerCase().includes(k.toLowerCase()))
        || keywords.some(k => f.type.toLowerCase().includes(k.toLowerCase()))
        || keywords.some(k => f.interest.interestRate + f.rewards.rewardRate >= parseInt(k.toLowerCase()))
        || keywords.some(k => f.assets.some(a => a.name.toLowerCase().includes(k.toLowerCase())))
      )

      setFieldValue('search', keywords)
      setFieldValue('strategies', nextStrategies)
    } else {
      setFieldValue('search', keywords)
      setFieldValue('strategies', investmentStrategies)
    }
  }

  return (
    <div className="input-group input-group-flush input-group-merge input-group-reverse">
      <input
        className="form-control list-search"
        type="search"
        placeholder="Search"
        value={values.search}
        onChange={handleChange}
      />
      <span className="input-group-text">
          <Icon component={Search} size={18} />
        </span>
    </div>
  )
}
