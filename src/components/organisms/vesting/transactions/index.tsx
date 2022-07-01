import React from 'react'
import styled from 'styled-components'
import { useVestingDashboard } from '@context/vesting-dashboard-context'
import { t } from '@lingui/macro'
import DataTable from './data-table'

export const Wrapper = styled.div`
    padding: 30px;
    width: 100%;
    @media only screen and (max-width : 978px) {
        padding: 25px;
    }
`

const Transactions = () => {
  const { dashboardData } = useVestingDashboard()
  const { transactions } = dashboardData

  if (!transactions) {
    return (
      <Wrapper>
        {t`No available transactions`}
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <div>
        {Object.keys(transactions).map((key, idx) => (
          <div className={idx !== transactions.length - 1 ? 'mb-4' : ''}>
            <DataTable
              {...transactions[key]}
              initiallyOpen={transactions.length === 1 || idx === 0}
            />
          </div>
        ))}
      </div>
    </Wrapper>
  )
}

export default Transactions
