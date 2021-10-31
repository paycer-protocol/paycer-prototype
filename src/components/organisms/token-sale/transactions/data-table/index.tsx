import React, { useState } from 'react'
import {t, Trans} from '@lingui/macro'
import InvestItem from "@components/organisms/invest/invest-item";
import {riskLabels} from "../../../../../locales";
import {Money, Percentage} from "@components/atoms/number";
import Button from "@components/atoms/button";

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
  value: string
}

const DataTable = (props: DataTableProps) => {
  const [showTable, setShowTable] = useState(false)

  return (
      <div className="table-responsive mb-0">
        <table className="table table-sm table-nowrap card-table">
          <thead onClick={() => setShowTable(!showTable)}>
          <tr>
            <th colSpan={2}>
              <span className="text-muted">
                {props.unixTimestamp}
              </span>
            </th>
          </tr>
          </thead>
          {(showTable &&
              <tbody className="list">
                <tr>
                  <td><Trans>Token</Trans></td>
                  <td>{props.tokenSymbol}</td>
                </tr>
              </tbody>
          )}
        </table>
      </div>
  )
}

export default DataTable
