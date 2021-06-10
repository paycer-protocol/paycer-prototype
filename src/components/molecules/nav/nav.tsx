import React from 'react'
import BaseNav, { NavProps as BaseNavProps } from 'react-bootstrap/Nav'
import BaseNavItem, { NavItemProps as BaseNavItemProps } from 'react-bootstrap/NavItem'
import BaseNavLink, { NavLinkProps as BaseNavLinkProps } from 'react-bootstrap/NavLink'
import './nav.styles.scss'

export interface NavProps extends BaseNavProps {}
export interface NavItemProps extends BaseNavItemProps {}
export interface NavLinkProps extends BaseNavLinkProps {}

const Nav = (props: NavProps) => <BaseNav {...props} />
export const NavItem = (props: NavItemProps) => <BaseNavItem {...props} />
export const NavLink = (props: NavLinkProps) => <BaseNavLink {...props} />

Nav.Item = NavItem
Nav.Link = NavLink

export default Nav
