import React from 'react'
import BaseSpinner, { SpinnerProps as BaseSpinnerProps } from 'react-bootstrap/Spinner'

export interface SpinnerProps extends BaseSpinnerProps {}

const Spinner: React.FC<SpinnerProps> = (props) => <BaseSpinner {...props} />

export default Spinner
