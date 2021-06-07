import React from 'react'
import BaseButton, { ButtonProps as BaseButtonProps } from 'react-bootstrap/Button'
import './button.styles.scss'

export interface ButtonProps extends BaseButtonProps {}

const Button: React.FC<ButtonProps> = (props) => <BaseButton {...props} />

export default Button
