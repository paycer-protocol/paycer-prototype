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
        padding: 25px;
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
            default:
                return t`Public Sale`
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
                                <LeftCol className="align-items-center d-flex">
                                    <Vesting />
                                </LeftCol>
                                <div className="vertical-line" />
                                <div className="horizontal-line d-md-none" />
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