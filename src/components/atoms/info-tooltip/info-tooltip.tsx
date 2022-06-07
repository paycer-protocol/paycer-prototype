import React, {ReactElement} from 'react'
import DropdownComponent from '@components/atoms/dropdown/dropdown'
import * as Styles from './Styles'
import { InfoCircle } from '@styled-icons/bootstrap'
import Icon from '@components/atoms/icon'

export interface InfoTooltipProps {
    children?: ReactElement | string | number | null,
}

const InfoTooltip: React.FC<InfoTooltipProps> = (props) => {

    const { children } = props

    return (
        <DropdownComponent className="d-inline-block mr-2 mb-2">
            <Styles.StyledDropdownToggle className="font-size-sm">
                <Icon component={InfoCircle} size={11} />
            </Styles.StyledDropdownToggle>
            <Styles.StyledDropdownMenu>
                <>
                    {/* @ts-ignore */}
                    {children}
                </>
            </Styles.StyledDropdownMenu>
        </DropdownComponent>
    )
}

export default InfoTooltip
