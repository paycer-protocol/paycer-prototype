import React from 'react';
import BaseButton, { ButtonProps as BaseButtonProps } from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

export interface ButtonProps extends BaseButtonProps {}

const Button = (props: ButtonProps) => <BaseButton {...props} />;

Button.Group = ButtonGroup;
Button.Toolbar = ButtonToolbar;

export default Button;
