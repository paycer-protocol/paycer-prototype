import React from 'react'
import { Trans } from '@lingui/macro'
import Card from '@components/molecules/card'
import InvestItem from './invest-item'
import { useInvestList } from "@context/invest-list-context";

export default function InvestList() {
  const {
    strategies
  } = useInvestList()

  const thClass = 'pb-3 pt-1'
  return (
      <Card>
          <div className="card-body p-3 pb-0">
            <div className="table-responsive mb-0 border-0">
              <table className="table table-sm table-nowrap card-table">
                <thead>
                <tr>
                    <th className={thClass}>
                      <span className="text-muted">
                        <Trans>POOL</Trans>
                      </span>
                    </th>
                    <th className={thClass}>
                      <span className="text-muted">
                        <Trans>Risk Level</Trans>
                      </span>
                    </th>
                    <th className={thClass}>
                      <span className="text-muted">
                        <Trans>Rewards</Trans>
                      </span>
                    </th>
                    <th className={thClass}>
                      <span className="text-muted">
                        <Trans>APR</Trans>
                      </span>
                    </th>
                    <th className={thClass}>
                      <span className="text-muted">
                        <Trans>Total Volume</Trans>
                      </span>
                    </th>
                <th />
                </tr>
                </thead>
                <tbody className="list">
                {strategies.map((strategy, key) => (
                    <InvestItem
                        key={`invest${key}`}
                        strategy={strategy}
                    />
                ))}
                </tbody>
              </table>
            </div>
          </div>
      </Card>
  )
}
