import { useVestingDashboard } from '@context/vesting-dashboard-context'
import React from 'react'
import { t } from '@lingui/macro'
import Claim from '@components/organisms/vesting/claim'
import Overview from '@components/organisms/vesting/overview'

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
            <div className="row">
                <div className="col-md-6">
                    <Overview />
                </div>
                <div className="col-md-6 blur-background">
                    <Claim />
                </div>
            </div>
        </>
    )
}

export default VestingDashboard
