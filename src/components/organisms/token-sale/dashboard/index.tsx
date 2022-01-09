import { useTokenSaleDashboard } from '@context/token-sale-dashboard-context'
import React, { useState } from 'react'
import styled from 'styled-components'
import { t } from '@lingui/macro'
import Transactions from '@components/organisms/token-sale/transactions'
import Vesting from '@components/organisms/token-sale/vesting'
import Overview from '@components/organisms/token-sale/overview'

export const LeftCol = styled.div`
    width: 50%;
    padding: 40px 20px 40px 40px;
    align-items: stretch;
    @media only screen and (max-width : 978px) {
      width: 100%; padding: 40px 20px 20px 20px;    
    }
`

export const RightCol = styled.div`
    width: 50%;
    padding: 40px 40px 40px 20px;

    @media only screen and (max-width : 978px) {
      width: 100%;
      padding: 20px;
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
                            <>
                                <LeftCol>
                                    <Vesting />
                                </LeftCol>
                                <RightCol>
                                    <Overview />
                                </RightCol>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TokenSaleDashboard
