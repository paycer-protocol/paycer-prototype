import React, { useState } from 'react'
import {t, Trans} from '@lingui/macro'
import CurrencyIcon from "@components/atoms/currency-icon";
import { tokenPriceUSD } from "@config/token-price";
import {FormattedNumber} from "@components/atoms/number";
import Button from "@components/atoms/button";
import { TransactionProps} from '../../../../../context/token-sale-context'

const DataTable = (props: TransactionProps) => {
  const date = new Date(props.transactionDateTime)
  let received = 0

  if (props.historicalUSDPrice) {
    const USDAmount = props.value * props.historicalUSDPrice
    received = USDAmount / tokenPriceUSD
  } else {
    received = props.value / tokenPriceUSD
  }

  const formattedDate = date.getDate()+
  "/"+(date.getMonth()+1)+
  "/"+date.getFullYear()+
  " "+date.getHours()+
  ":"+date.getMinutes()+
  ":"+date.getSeconds()

  return (
      <div className="table-responsive mb-0">
        <table className="table table-sm table-nowrap card-table">
          <thead>
          <tr>
            <th>
              <span className="pe-3">
                <span className="text-muted pe-2 d-none d-md-inline">Transaction ID:</span>
                  <span className="text-muted pe-2 d-md-none">ID:</span>
                <span className="text-white">{props['@id'].split('/')[2]}</span>
              </span>
            </th>
          </tr>
          </thead>
          <tbody className="list">
          <tr>
            <td><Trans>Date</Trans></td>
            <td>{formattedDate}</td>
          </tr>
          <tr>
            <td><Trans>Invested</Trans></td>
            <td>
              <span className="pe-2">
                <FormattedNumber
                  value={props.value}
                  minimumFractionDigits={2}
                  maximumFractionDigits={4}
                />
              </span>
              <span className="fw-bold pe-2">{props.tokenName}</span>
              <span style={{position: 'relative', top: '-2px'}}>
                <CurrencyIcon
                  symbol={props.tokenSymbol}
                  className="me-2"
                  width={30}
                  height={30}
                />
              </span>
            </td>
          </tr>
          <tr>
            <td><Trans>Received</Trans></td>
            <td>
              <span className="pe-2">
                <FormattedNumber
                  value={received}
                  minimumFractionDigits={2}
                  maximumFractionDigits={4}
                />
              </span>
              <span className="fw-bold pe-2">PCR Token</span>
              <span style={{position: 'relative', top: '-2px'}}>
                  <CurrencyIcon
                    symbol="PCR"
                    className="me-2"
                    width={30}
                    height={30}
                  />
              </span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
  )
}

export default DataTable
