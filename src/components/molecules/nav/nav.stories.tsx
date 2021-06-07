import React from 'react'
import { Meta } from '@storybook/react'
import NavComponent, { NavItem, NavLink, NavProps } from './nav'

export default {
    title: 'Molecule/Nav',
    component: NavComponent,
    argTypes: {
        variant: {
            control: 'radio',
            options: ['tabs', 'pills'],
        },
        activeKey: {
            control: 'text',
        },
        defaultActiveKey: {
            control: 'text',
        },
        fill: {
            control: 'boolean',
        },
        justify: {
            control: 'boolean',
        },
        navbar: {
            control: 'boolean',
        },
        navbarScroll: {
            control: 'boolean',
        },
        onSelect: {
            action: 'onSelect'
        },
        onKeyDown: {
            action: 'onKeyDown'
        },
    },
} as Meta

const Template: (args: NavProps) => JSX.Element = (args: NavProps) => (
    <NavComponent {...args}>
        <NavItem>
            <NavLink eventKey="link-0">Active</NavLink>
        </NavItem>
        <NavItem>
            <NavLink eventKey="link-1">Link</NavLink>
        </NavItem>
        <NavItem>
            <NavLink eventKey="link-2">Link</NavLink>
        </NavItem>
        <NavItem>
            <NavLink eventKey="disabled" disabled>
                Disabled
            </NavLink>
        </NavItem>
    </NavComponent>
)

export const Nav = Template.bind({})
Nav.args = {
    defaultActiveKey: 'link-0'
}
