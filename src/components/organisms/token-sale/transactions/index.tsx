import React from 'react'
import {t, Trans} from '@lingui/macro'
import { useTokenSale } from '@context/token-sale-context'
import DataTable from './data-table'
import {tokenPriceUSD} from "@config/token-price";

const Transactions = () => {
    const { tokenSaleData } = useTokenSale()
    const { transactions } = tokenSaleData

    console.log(transactions)

    return (
      <div className="w-75">
        <h2><Trans>Transactions</Trans></h2>
            <div className="w-100">
                {Object.keys(transactions).map((key, value) => (
                    <div className="mb-4">
                        <DataTable
                            { ...transactions[key] }
                        />
                    </div>
                ))}
            </div>
      </div>
    )
}

export default Transactions
