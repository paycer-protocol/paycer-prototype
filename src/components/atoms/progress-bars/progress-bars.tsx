import React from 'react'
import BaseProgressBar, { ProgressBarProps as BaseProgressBarProps } from 'react-bootstrap/ProgressBar'

export interface ProgressBarProps extends BaseProgressBarProps {}

const ProgressBar: React.FC<ProgressBarProps> = (props) => (
  <BaseProgressBar {...props} />
)

export default ProgressBar
