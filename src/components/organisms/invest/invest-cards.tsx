import React from 'react'
import InvestCard from '@components/organisms/invest/invest-card'
import { useInvestList } from "@context/invest-list-context"

export default function InvestCards() {
  const {
    strategies
  } = useInvestList()

  return (
    <div className="row mt-4">
      {strategies.map((strategy, key) => (
        <div key={`invest-card${key}`} className="col-12 col-md-6 col-lg-4">
          <InvestCard {...strategy} />
        </div>
      ))}
    </div>
  )
}
