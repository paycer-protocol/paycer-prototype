import React from 'react'
import BaseDropdown, { DropdownProps as BaseDropdownProps } from 'react-bootstrap/Dropdown'
import BaseDropdownToggle, { DropdownToggleProps as BaseDropdownToggleProps } from 'react-bootstrap/DropdownToggle'
import BaseDropdownButton, { DropdownButtonProps as BaseDropdownButtonProps } from 'react-bootstrap/DropdownButton'
import BaseDropdownItem, { DropdownItemProps as BaseDropdownItemProps } from 'react-bootstrap/DropdownItem'
import BaseDropdownMenu, { DropdownMenuProps as BaseDropdownMenuProps } from 'react-bootstrap/DropdownMenu'
import './dropdown.styles.scss'

export interface DropdownProps extends BaseDropdownProps {}
export interface DropdownToggleProps extends BaseDropdownToggleProps {}
export interface DropdownButtonProps extends BaseDropdownButtonProps {}
export interface DropdownItemProps extends BaseDropdownItemProps {}
export interface DropdownMenuProps extends BaseDropdownMenuProps {}

const Dropdown = ({ children, ...restProps}: DropdownProps) => (
    <BaseDropdown {...restProps}>
        {children}
    </BaseDropdown>
)

export const DropdownToggle = ({ children, ...restProps}: DropdownToggleProps) => (
    <BaseDropdownToggle {...restProps}>
        {children}
    </BaseDropdownToggle>
)

export const DropdownButton = ({ children, ...restProps}: DropdownButtonProps) => (
    <BaseDropdownButton {...restProps}>
        {children}
    </BaseDropdownButton>
)

export const DropdownItem = ({ children, ...restProps}: DropdownItemProps) => (
    <BaseDropdownItem {...restProps}>
        {children}
    </BaseDropdownItem>
)

export const DropdownMenu = ({ children, ...restProps}: DropdownMenuProps) => (
    <BaseDropdownMenu {...restProps}>
        {children}
    </BaseDropdownMenu>
)

Dropdown.Toggle = DropdownToggle
Dropdown.Button = DropdownButton
Dropdown.Item = DropdownItem
Dropdown.Menu = DropdownMenu

export default Dropdown
