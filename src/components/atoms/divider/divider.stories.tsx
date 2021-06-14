import React from 'react'
import {Meta} from '@storybook/react'
import Divider, { DividerProps } from './divider'
import Nav, { NavLink, NavItem } from '@components/molecules/nav'

export default {
    title: 'Atom/Divider',
    component: Divider,
    argTypes: {}
} as Meta

const DefaultTemplate: (args: DividerProps) => JSX.Element = (args: DividerProps) => (
    <Divider {...args} />
)

const WithHeadingTemplate: (args: DividerProps) => JSX.Element = (args: DividerProps) => (
    <Divider {...args}>Divider heading</Divider>
)

const WithNavTemplate: (args: DividerProps) => JSX.Element = (args: DividerProps) => (
    <Divider {...args}>
        <Nav defaultActiveKey="link-0">
            <NavItem>
                <NavLink eventKey="link-0">Active</NavLink>
            </NavItem>
            <NavItem>
                <NavLink eventKey="link-1">Link</NavLink>
            </NavItem>
            <NavItem>
                <NavLink eventKey="link-2">Link</NavLink>
            </NavItem>
        </Nav>
    </Divider>
)

export const Default = DefaultTemplate.bind({})
Default.args = {}

export const WithHeading = WithHeadingTemplate.bind({})
WithHeading.args = {}

export const WithNav = WithNavTemplate.bind({})
WithNav.args = {}

