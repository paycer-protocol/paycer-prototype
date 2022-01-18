import React from 'react'
import { t } from '@lingui/macro'
import InfoTooltip from '@components/atoms/info-tooltip'

export interface TierLevelProps {
    tokenAmount: number
    hasLegend?: boolean
}

const TierLevel: React.FC<TierLevelProps> = (props) => {
    const { tokenAmount, hasLegend } = props

    const calculateTierLevel = () => {
        if (tokenAmount >= 100000) {
            return t`Partner`
        }
        if (tokenAmount >= 35000) {
            return t`Manager`
        }
        if (tokenAmount >= 15000) {
            return t`Senior`
        }
        if (tokenAmount >= 5000) {
            return t`Associate`
        }

        return t`none`
    }

    if (!tokenAmount) {
        return (
            <div>{t`none`}</div>
        )
    }

    return (
        <div className="d-flex">
            {calculateTierLevel()}
            {(hasLegend &&
            <InfoTooltip>
              <>
                <strong>{t`Associate`}</strong> - 5.000 or more PCR Tokens<br />
                <strong>{t`Senior`}</strong> - 15.000 or more PCR Tokens<br />
                <strong>{t`Manager`}</strong> - 35.000 or more PCR Tokens<br />
                <strong>{t`Partner`}</strong> - 100.000 or more PCR Tokens
              </>
            </InfoTooltip>
            )}
        </div>
    )
}

export default TierLevel
