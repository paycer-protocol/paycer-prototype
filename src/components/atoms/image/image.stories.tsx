import React from 'react'
import { Meta } from '@storybook/react'
import ImageComponent, { ImageProps } from './image'

export default {
  title: 'Atom/Image',
  component: ImageComponent,
  argTypes: {
    fluid: {
      control: 'boolean',
    },
    rounded: {
      control: 'boolean',
    },
    roundedCircle: {
      control: 'boolean',
    },
    thumbnail: {
      control: 'boolean',
    },
  },
} as Meta

const Template: (args: ImageProps) => JSX.Element = (args: ImageProps) => (
  <ImageComponent {...args} className="mr-2" />
)

export const Image = Template.bind({})
Image.args = {
  src: 'https://images.unsplash.com/photo-1511798616182-aab3698ac53e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
}
