import React, { useState } from 'react'
import { t, Trans } from '@lingui/macro'
import TxnLink from '@components/atoms/txn-link'
import { privateSalePriceUSD, preSalePriceUSD, publicSalePriceUSD } from '@config/token-price'
import { FormattedNumber } from '@components/atoms/number'
import Button from '@components/atoms/button'
import { useVestingDashboard } from '@context/vesting-dashboard-context'

export interface DataTableProps {
  unixTimestamp: number
  tokenSymbol: string
  id: string
  type: string
  fromAddress: string
  historicalUSDPrice: number
  toAddress: string
  tokenName: string
  transactionDateTime: string
  transactionHash: string
  value: number
  chain: string
  initiallyOpen?: boolean
}

const DataTable = (props: DataTableProps) => {
  const { dashboardData } = useVestingDashboard()
  const [showTable, setShowTable] = useState(props?.initiallyOpen)
  const date = new Date(props.transactionDateTime)
  let received = 0

  let tokenSalePriceUSD = publicSalePriceUSD
  if (dashboardData.type === 'private') {
    tokenSalePriceUSD = privateSalePriceUSD
  } else if (dashboardData.type === 'pre') {
    tokenSalePriceUSD = preSalePriceUSD
  }

  if (props.historicalUSDPrice) {
    const USDAmount = props.value * props.historicalUSDPrice
    received = USDAmount / tokenSalePriceUSD
  } else {
    received = props.value / tokenSalePriceUSD
  }

  const formattedDate = `${date.getDate()
  }/${date.getMonth() + 1
  }/${date.getFullYear()
  } ${date.getHours()
  }:${date.getMinutes()
  }:${date.getSeconds()}`

  return (
    <div className="table-responsive mb-0">
      <table className="table table-sm table-nowrap card-table">
        <thead style={!showTable ? { borderBottom: '0' } : {}}>
          <tr>
            <th className="pe-0">
              <span className="text-white">
                <TxnLink
                  chain={props.chain}
                  txnHash={props.transactionHash}
                />
              </span>
            </th>
            <th className="d-flex justify-content-end">
              <Button onClick={() => setShowTable(!showTable)} active={showTable} variant="primary">
                {showTable ? t`Hide` : t`Show`}
              </Button>
            </th>
          </tr>
        </thead>
        {(showTable
              && (
              <tbody className="list">
                <tr>
                  <td>{t`Date`}</td>
                  <td>{formattedDate}</td>
                </tr>
                <tr>
                  <td>{t`Invested`}</td>
                  <td>
                    <span className="pe-2">
                      <FormattedNumber
                        value={props.value}
                        minimumFractionDigits={2}
                        maximumFractionDigits={4}
                      />
                    </span>
                    <span className="fw-bold pe-2">{props.tokenName}</span>
                  </td>
                </tr>
                <tr>
                  <td>{t`PCR Token amount`}</td>
                  <td>
                    <span className="pe-2">
                      <FormattedNumber
                        value={received}
                        minimumFractionDigits={2}
                        maximumFractionDigits={4}
                      />
                    </span>
                    <span className="fw-bold pe-2">PCR</span>
                  </td>
                </tr>
                <tr>
                  <td>{t`From Wallet Address`}</td>
                  <td>{props.fromAddress}</td>
                </tr>
              </tbody>
              )
          )}
      </table>
    </div>
  )
}

export default DataTable
