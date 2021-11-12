import React, { useState } from 'react'
import {t, Trans} from '@lingui/macro'
import CurrencyIcon from "@components/atoms/currency-icon";
import { tokenPriceUSD } from "@config/token-price";
import {FormattedNumber} from "@components/atoms/number";
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
  value: number
  initiallyOpen?: boolean
}

const DataTable = (props: DataTableProps) => {
  const [showTable, setShowTable] = useState(props?.initiallyOpen)
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
          <thead onClick={() => setShowTable(!showTable)} style={!showTable ? {borderBottom: '0', cursor: 'pointer'} : {cursor: 'pointer'}}>
          <tr>
            <th>
              <span className="pe-3">
                <span className="text-muted pe-2">ID:</span>
                <span className="text-white">{props['@id'].split('/')[2]}</span>
              </span>
            </th>
            <th className="d-flex justify-content-end">
              <Button active={showTable} variant="primary">
                {showTable ? t`Hide` : t`Show`}
              </Button>
            </th>
          </tr>
          </thead>
          {(showTable &&
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
                </td>
              </tr>
              <tr>
                <td><Trans>PCR Token amount</Trans></td>
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
                <td><Trans>Transaction Hash</Trans></td>
                <td>{props.transactionHash}</td>
              </tr>
              <tr>
                <td><Trans>From Wallet Address</Trans></td>
                <td>{props.fromAddress}</td>
              </tr>
              </tbody>
          )}
        </table>
      </div>
  )
}

export default DataTable