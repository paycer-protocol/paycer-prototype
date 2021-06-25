import React from 'react'
import BaseAlert, { AlertProps as BaseAlertProps } from 'react-bootstrap/Alert'

export interface AlertProps extends BaseAlertProps {}

const Alert: React.FC<AlertProps> = (props) => <BaseAlert {...props} />

export default Alert
