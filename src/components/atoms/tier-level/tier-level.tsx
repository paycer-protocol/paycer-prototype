import React from 'react'
import DropdownComponent from '@components/atoms/dropdown/dropdown'
import { t } from '@lingui/macro'
import * as Styles from './Styles'
import { InfoCircle } from '@styled-icons/bootstrap'
import Icon from '@components/atoms/icon'

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
    }

    if (!tokenAmount) {
        return (
            <span>t`none`</span>
        )
    }

    return (
        <div className="d-flex">
            {calculateTierLevel()}
            {(hasLegend &&
            <DropdownComponent className="d-inline-block mr-2 mb-2">
              <Styles.StyledDropdownToggle className="font-size-sm">
                <Icon component={InfoCircle} size={12} />
              </Styles.StyledDropdownToggle>
              <Styles.StyledDropdownMenu>
                <strong>{t`Associate`}</strong> - 5.000 or more PCR Tokens<br />
                <strong>{t`Senior`}</strong> - 15.000 or more PCR Tokens<br />
                <strong>{t`Manager`}</strong> - 35.000 or more PCR Tokens<br />
                <strong>{t`Partner`}</strong> - 100.000 or more PCR Tokens
              </Styles.StyledDropdownMenu>
            </DropdownComponent>
            )}
        </div>
    )
}

export default TierLevel
