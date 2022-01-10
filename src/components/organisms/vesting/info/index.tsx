import React from 'react'
import { t } from '@lingui/macro'
import Card from '@components/molecules/card'
import { useVestingDashboard } from '@context/vesting-dashboard-context'

const KycProcessInfo = () => {

    const { dashboardData } = useVestingDashboard()

    const {
        bonusPercentage,
        immediateAvailabilityPercentage
    } = dashboardData

    return (
      <>
        <Card.Text>
            {( (bonusPercentage || immediateAvailabilityPercentage) &&
              <>
                <div className="horizontal-line mt-5" />
                <h2 className="mb-4">
                    {t`Bonus & Availability`}
                </h2>
              </>
             )}
            {(bonusPercentage &&
              <>
                <div className="text-muted transform-uppercase">
                    {t`Bonus Percentage`}
                </div>
                {bonusPercentage}%
              </>
            )}
            {(immediateAvailabilityPercentage &&
              <>
                <div className="text-muted transform-uppercase mt-3">
                    {t`Immediate Availability Percentage`}
                </div>
                  {immediateAvailabilityPercentage}%
              </>
            )}
        </Card.Text>
      </>
    )
}

export default KycProcessInfo
