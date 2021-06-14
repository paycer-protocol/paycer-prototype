import React from 'react'
import { Story, Meta } from '@storybook/react'
import HeaderComponent, { HeaderProps } from './header'
import theme from '../../../config/theme'

export default {
    title: 'Organism/Header',
    argTypes: {},
} as Meta

type StoryOptions = Partial<HeaderProps>

const Template: Story<StoryOptions> = (props: StoryOptions) => (
    <HeaderComponent {...props} />
)

export const Header = Template.bind({})
Header.args = {}
