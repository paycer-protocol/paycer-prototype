import React from 'react'
import classnames from 'classnames'
import BaseNavbar, { NavbarProps as BaseNavbarProps } from 'react-bootstrap/Navbar'
import BaseNavbarBrand from 'react-bootstrap/NavbarBrand'
import BaseNavbarCollapse from 'react-bootstrap/NavbarCollapse'
import BaseNavbarContext from 'react-bootstrap/NavbarContext'
import BaseNavbarToggle from 'react-bootstrap/NavbarToggle'

export interface NavbarProps extends BaseNavbarProps {}

const Navbar = ({className = '', ...props}: NavbarProps) => (
    <BaseNavbar
        className={classnames('navbar navbar-expand-lg navbar-light', )}
        {...props}
    />
)

Navbar.Brand = BaseNavbarBrand
Navbar.Collapse = BaseNavbarCollapse
Navbar.Context = BaseNavbarContext
Navbar.Toggle = BaseNavbarToggle

export default Navbar
