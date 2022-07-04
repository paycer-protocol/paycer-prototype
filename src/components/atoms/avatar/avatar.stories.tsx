import React from 'react'
import { Meta } from '@storybook/react'
import theme from '../../../config/theme'
import AvatarComponent, { AvatarProps } from './avatar'

export default {
  title: 'Atom/Avatar',
  component: AvatarComponent,
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
  <AvatarComponent {...args} />
)

export const Avatar = Template.bind({})
Avatar.args = {
  size: 'md',
  src: 'https://www.gravatar.com/avatar/awesome?s=80&d=identicon&r=g',
}
