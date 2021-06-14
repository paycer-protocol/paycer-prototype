import React from 'react'
import { Story, Meta } from '@storybook/react'
import NavbarComponent, { NavbarProps } from './navbar'
import Nav from '../nav'

export default {
    title: 'Molecule/Navbar',
    component: NavbarComponent,
    argTypes: {

    },
} as Meta

type StoryOptions = Partial<NavbarProps>

const Template: Story<StoryOptions> = (props: StoryOptions) => (
    <NavbarComponent {...props}>
        <NavbarComponent.Brand href="#home">
            Logo
        </NavbarComponent.Brand>
        <NavbarComponent.Toggle aria-controls="basic-navbar-nav" />
        <NavbarComponent.Collapse id="basic-navbar-nav">
            <NavbarComponent variant="dark" className="ml-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <Nav.Dropdown title="Dropdown" id="basic-nav-dropdown">
                    <Nav.Dropdown.Item href="#action/3.1">Action</Nav.Dropdown.Item>
                    <Nav.Dropdown.Item href="#action/3.2">Another action</Nav.Dropdown.Item>
                    <Nav.Dropdown.Item href="#action/3.3">Something</Nav.Dropdown.Item>
                    <Nav.Dropdown.Divider />
                    <Nav.Dropdown.Item href="#action/3.4">Separated link</Nav.Dropdown.Item>
                </Nav.Dropdown>
            </NavbarComponent>
        </NavbarComponent.Collapse>
    </NavbarComponent>
)

export const Default = Template.bind({})
Default.args = {}

export const Dark = Template.bind({})
Dark.args = {
    variant: 'dark',
    bg: 'dark'
}
