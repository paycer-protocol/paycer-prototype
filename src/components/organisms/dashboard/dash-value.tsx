import React from 'react'
import { StyledIcon } from '@styled-icons/styled-icon'
import { Variant } from 'react-bootstrap/types'
import Icon from '@components/atoms/icon'
import Card from '@components/molecules/card'

export interface DashValueProps {
    title: string
    value: number | string | null
    variant?: Variant
    iconComponent?: StyledIcon
    iconSize?: number
    iconColor?: string
    style?: object
}


const DashValue = (props: DashValueProps) => {
    const {
        title,
        value,
        variant,
        iconComponent,
        iconSize = 30,
        iconColor = null,
        ...restProps
    } = props

    const textColor = variant && variant !== 'light' ? 'white' : null

    return (
        <Card
            bg={variant}
            text={textColor}
            {...restProps}
        >
            <Card.Body>
                <div className="row align-items-center gx-0">
                    <div className="col">
                        <h6 className="text-uppercase text-muted mb-2">
                            {title}
                        </h6>
                        <span className="h2 mb-0">
                          {value}
                        </span>
                    </div>
                    {iconComponent && (
                        <div className="col-auto">
                            <Icon
                                component={iconComponent}
                                className="h2 mb-0"
                                color={iconColor}
                                size={iconSize}
                            />
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    )
}

export default DashValue
