import { useTokenSaleDashboard } from '@context/token-sale-dashboard-context'
import React, { useState } from 'react'
import styled from 'styled-components'
import { t } from '@lingui/macro'
import Transactions from '@components/organisms/token-sale/transactions'
import Vesting from '@components/organisms/token-sale/vesting'
import Overview from '@components/organisms/token-sale/overview'

export const LeftCol = styled.div`
    width: 40%;
    padding: 80px 0 80px 30px;

    @media only screen and (max-width : 978px) {
      width: 100%;
      padding: 25px;
    }
`

export const RightCol = styled.div`
    width: 60%;
    padding: 60px;

    @media only screen and (max-width : 978px) {
      width: 100%;
      padding: 0 25px 25px 25px;
    }
`

const TokenSaleDashboard = () => {
    const { dashboardData } = useTokenSaleDashboard()
    const transactions = dashboardData?.transactions
    const [transactionTabActive, setTransactionTabActive] = useState(false)

    const renderTabLabel = () => {
        const type = dashboardData?.type
        switch (type) {
            case 'pre':
                return t`Pre Sale`
            case 'private':
                return t`Private Sale`
            case 'public':
                return t`Public Sale`
            case 'team':
                return t`Team distribution`
            case 'advisor':
                return t`Advisor distribution`
        }
    }

    return (
        <>
            <div className="d-flex">
                <div className={transactionTabActive ? 'PCR-Tab' : 'PCR-Tab PCR-Tab--isActive' } onClick={() => setTransactionTabActive(false)}>
                    {renderTabLabel()}
                </div>
                {(transactions?.length > 0  &&
                  <div className={transactionTabActive ? 'PCR-Tab PCR-Tab--isActive' : 'PCR-Tab' } onClick={() => setTransactionTabActive(true)}>
                      {t`Transactions`}
                  </div>
                )}
            </div>
            <div className="card blur-background">
                <div className="card-body p-0">
                    <div className="d-lg-flex">
                        {(transactionTabActive
                            ?
                                <Transactions />
                            :
                            <div className="d-block d-md-flex w-100 p-md-5 align-items-stretch">
                                <div className="w-100 w-md-50 p-3">
                                    <Vesting />
                                </div>
                                <div className="w-100 w-md-50 p-3">
                                    <Overview />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TokenSaleDashboard
