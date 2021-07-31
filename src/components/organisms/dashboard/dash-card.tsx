import React from 'react'
import { StyledIcon } from '@styled-icons/styled-icon'
import { Variant } from 'react-bootstrap/types'
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
        children,
        ...restProps
    } = props

    const textColor = variant && variant !== 'light' ? 'white' : null

    return (
        <Card
            bg={variant}
            text={textColor}
            className="border-0 bg-transparent shadow-none"
            {...restProps}
        >
            <Card.Body>
                <div className="row align-items-center gx-0">
                    <div className="col">
                        <h5 className="text-uppercase mb-2 text-center fw-light text-gray-500 fw-light">
                            {title}
                        </h5>
                        <span className="h2 mb-0 d-flex display-4">
                            {children}
                        </span>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default DashCard
