import React from 'react'
import { Meta } from '@storybook/react'
import theme from '../../../config/theme'
import Avatar , { AvatarProps } from './avatar'

export default {
    title: 'Atom/Avatar',
    component: Avatar,
    argTypes: {
        size: {
            control: 'radio',
            options: theme.sizes,
        },
        isOnline: {
            control: 'boolean',
        },
        isOffline: {
            control: 'boolean',
        },
        src: {
            control: 'string',
        },
        alt: {
            control: 'string',
        },
    },
} as Meta

const Template: (args: AvatarProps) => JSX.Element = (args: AvatarProps) => (
    <Avatar {...args} />
)

export const Variant = Template.bind({})
Variant.args = {
    size: 'md',
    src: 'https://www.gravatar.com/avatar/awesome?s=80&d=identicon&r=g',
}

