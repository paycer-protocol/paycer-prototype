import React, {ReactElement} from 'react'
import DropdownComponent from '@components/atoms/dropdown/dropdown'
import Button from '@components/atoms/button'
import { t } from '@lingui/macro'
import * as Styles from './Styles'
import { InfoCircle } from '@styled-icons/bootstrap'
import Icon from '@components/atoms/icon'


export interface TierLevelProps {
    tokenAmount: number
    hasLegend?: boolean
    asImage?: boolean
}

const TierLevel: React.FC<TierLevelProps> = (props) => {
    const { tokenAmount, hasLegend, asImage } = props

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

    const renderImage = ():ReactElement | string => {

        let tierlevelId = ''
        let tierlevelLabel = ''

        if (tokenAmount >= 100000) {
            tierlevelId = 'partner'
            tierlevelLabel = t`Partner`
        }
        else if (tokenAmount >= 35000) {
            tierlevelId = 'manager'
            tierlevelLabel = t`Manager`
        }
        else if (tokenAmount >= 15000) {
            tierlevelId = 'senior'
            tierlevelLabel = t`Senior`
        }
        else if (tokenAmount >= 5000) {
            tierlevelId = 'associate'
            tierlevelLabel = t`Associate`
        }

        if (!tierlevelId || !tokenAmount) {
            return ''
        }

        return (
            <Button className="d-flex align-items-center justify-content-center bg-dark">
                <img src={`/assets/tier-levels/paycer_${tierlevelId}.svg`} width="20" height="20" />
                <div className="pt-1 pb-1 mx-2 ps-2">{tierlevelLabel}</div>
            </Button>
        )
    }

    if (asImage) {
        return (
            <>
                {renderImage()}
            </>
        )
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
