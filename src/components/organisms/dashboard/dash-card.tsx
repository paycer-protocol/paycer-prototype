import React from 'react'
import { StyledIcon } from '@styled-icons/styled-icon'
import { Variant } from 'react-bootstrap/types'
import Icon from '@components/atoms/icon'
import Card from '@components/molecules/card'

export interface DashCardProps {
    title: string
    variant?: Variant
    iconComponent?: StyledIcon
    iconSize?: number
    iconColor?: string
    style?: object
    children?: any
}


const DashCard = (props: DashCardProps) => {
    const {
        title,
        variant,
        iconComponent,
        iconSize = 30,
        iconColor = null,
        children,
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
                            {children}
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

export default DashCard
