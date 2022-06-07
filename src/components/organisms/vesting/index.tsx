import React from 'react'
import {t} from '@lingui/macro'
import { VestingDashboardProvider } from '@context/vesting-dashboard-context'
import useTokenSale from '@hooks/use-token-sale'
import { useDapp } from '@context/dapp-context'
import Spinner from '@components/atoms/spinner'
import Dashboard from './dashboard'
import LoginCard from '@components/organisms/login-card'

const Vesting = () => {
    const { isAuthenticated } = useDapp()
    const { tokenSaleData, loading, } = useTokenSale()

    if (!isAuthenticated) {
        return (
            <LoginCard />
        )
    }

    if (loading) {
        return (
            <div className="card bg-transparent border-0 blur-background">
                <div className="bg-transparent d-flex justify-content-center align-items-center">
                    <Spinner animation="border" show />
                </div>
            </div>
        )
    }

    if (!tokenSaleData.length) {
        return (
          <div className="card bg-transparent border-0 blur-background">
              <div className="bg-transparent d-flex justify-content-center align-items-center">
                  <div className="card-body">
                      <h2 className="mb-0 text-center">
                          {t`You have not participated in the paycer token sale.`}
                      </h2>
                  </div>
              </div>
          </div>
        )
    }

    return (
        <>
            {tokenSaleData.map((dashboardData, index) => (
                <VestingDashboardProvider key={index} dashboardData={dashboardData}>
                    <div className={index +1 !== tokenSaleData.length ? 'mb-6' : ''}>
                        <Dashboard />
                    </div>
                </VestingDashboardProvider>
            ))}
        </>
    )

}

export default Vesting
