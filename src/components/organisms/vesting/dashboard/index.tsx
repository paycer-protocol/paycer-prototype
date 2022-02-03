import { useVestingDashboard } from '@context/vesting-dashboard-context'
import React, { useState } from 'react'
import styled from 'styled-components'
import { t } from '@lingui/macro'
import Transactions from '@components/organisms/vesting/transactions'
import Claim from '@components/organisms/vesting/claim'
import Overview from '@components/organisms/vesting/overview'

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

const VestingDashboard = () => {
    const { dashboardData } = useVestingDashboard()

    const renderTabLabel = () => {
        const type = dashboardData?.type
        const launchpad = dashboardData?.launchpad
        switch (type) {
            case 'pre':
                return t`Pre Sale distribution`
            case 'private':
                return t`Private Sale distribution`
            case 'public':
            case 'public_v2':
                return t`Public Sale distribution` + (launchpad ? ' ' + launchpad : '')
            case 'pre_v2':
                return t`Pre Sale distribution`
            case 'private_v2':
                return t`Private Sale distribution`
            case 'team':
                return t`Team distribution`
            case 'advisor':
                return t`Advisor distribution`
            default:
                return t`Token distribution`
        }
    }

    return (
        <>
            <div className="card blur-background">
                <div className="card-body p-0">
                    <div className="d-lg-flex">
                        <LeftCol>
                            <Overview />
                        </LeftCol>
                        <RightCol>
                            <div className="display-4 fw-normal mb-5 text-center text-md-start">
                                {t`Claim`} {renderTabLabel()}
                            </div>
                            <Claim />
                        </RightCol>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VestingDashboard
