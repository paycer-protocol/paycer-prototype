import { useTokenSaleDashboard } from '@context/token-sale-dashboard-context'
import React, {useState} from 'react'
import {t, Trans} from '@lingui/macro'
import Transactions from '@components/organisms/token-sale/transactions'
import Vesting from '@components/organisms/token-sale/vesting'
import KycProcessTimeline from '@components/organisms/token-sale/timeline'
import { LeftCol, RightCol } from '../../../../pages/token-sale'

const TokenSaleDashboard = () => {

    const { dashboardData } = useTokenSaleDashboard()

    const transactions = dashboardData?.transactions
    const [transactionTabActive, setTransactionTabActive] = useState(false)

    return (
        <>
            <div className="d-flex">
                <div className={transactionTabActive ? 'PCR-Tab' : 'PCR-Tab PCR-Tab--isActive' } onClick={() => setTransactionTabActive(false)}>
                    {t`Status`}
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
                                    <KycProcessTimeline />
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