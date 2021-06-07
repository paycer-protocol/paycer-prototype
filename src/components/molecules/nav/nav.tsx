import React from 'react'
import BaseNav, { NavProps as BaseNavProps } from 'react-bootstrap/Nav'
import BaseNavItem, { NavItemProps as BaseNavItemProps } from 'react-bootstrap/NavItem'
import BaseNavLink, { NavLinkProps as BaseNavLinkProps } from 'react-bootstrap/NavLink'
import './nav.styles.scss'

export interface NavProps extends BaseNavProps {}
export interface NavItemProps extends BaseNavItemProps {}
export interface NavLinkProps extends BaseNavLinkProps {}

const Nav: React.FC<NavProps> = (props) => <BaseNav {...props} />
export const NavItem: React.FC<NavItemProps> = (props) => <BaseNavItem {...props} />
export const NavLink: React.FC<NavLinkProps> = (props) => <BaseNavLink {...props} />

export default Nav
