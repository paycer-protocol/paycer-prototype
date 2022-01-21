import React from 'react'
import BaseSpinner, { SpinnerProps as BaseSpinnerProps } from 'react-bootstrap/Spinner'

export interface SpinnerProps extends BaseSpinnerProps {
    show?: boolean
}

const Spinner: React.FC<SpinnerProps> | any = (props) => {

    if (!props.show) {
        return null
    }

    return (
        <BaseSpinner animation={props.animation} />
    )

}

export default Spinner
