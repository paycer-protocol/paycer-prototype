import React from 'react'
import {useFormikContext} from 'formik'
import { InvestListProps } from './types'
import InvestCard from '@components/organisms/invest/invest-card'

export default function InvestCards() {
  const { values } = useFormikContext<InvestListProps>()

  return (
    <div className="row mt-4">
      {values.strategies.map((strategy, key) => (
        <div key={`invest-card${key}`} className="col-12 col-md-6 col-lg-4">
          <InvestCard {...strategy} />
        </div>
      ))}
    </div>
  )
}
