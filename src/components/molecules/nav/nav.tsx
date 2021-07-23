import React from 'react'
import BaseNav from 'react-bootstrap/Nav'
import BaseNavItem from 'react-bootstrap/NavItem'
import BaseNavLink from 'react-bootstrap/NavLink'
import NavDropdown from 'react-bootstrap/NavDropdown'

export interface NavProps {}
export interface NavItemProps {}
export interface NavLinkProps {}

const Nav = (props: NavProps) => <BaseNav {...props} />
export const NavItem = (props: NavItemProps) => <BaseNavItem {...props} />
export const NavLink = (props: NavLinkProps) => <BaseNavLink {...props} />

Nav.Item = NavItem
Nav.Link = NavLink
Nav.Dropdown = NavDropdown

export default Nav
