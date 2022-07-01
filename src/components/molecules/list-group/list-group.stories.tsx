import React from 'react'
import { Story, Meta } from '@storybook/react'
import theme from '../../../config/theme'
import ListGroupComponent, { ListGroupProps } from './list-group'

export default {
  title: 'Molecule/ListGroup',
  component: ListGroupComponent,
  argTypes: {
    horizontal: { control: 'select', options: theme.sizes },
    variant: { control: 'select', options: ['default', 'flush'] },
    itemVariant: { control: 'select', options: theme.colors },
  },
} as Meta

interface VariantProps {
  itemVariant?: string
}

type StoryOptions = Partial<ListGroupProps> & Partial<VariantProps>

const Template: Story<StoryOptions> = ({ itemVariant, ...args }: StoryOptions) => (
  <ListGroupComponent {...args}>
    <ListGroupComponent.Item variant={itemVariant} active>
      Cras justo odio
    </ListGroupComponent.Item>
    <ListGroupComponent.Item variant={itemVariant}>Dapibus ac facilisis in</ListGroupComponent.Item>
    <ListGroupComponent.Item variant={itemVariant} disabled>
      Morbi leo risus
    </ListGroupComponent.Item>
    <ListGroupComponent.Item variant={itemVariant}>
      Porta ac consectetur ac
    </ListGroupComponent.Item>
  </ListGroupComponent>
)

export const ListGroup = Template.bind({})
ListGroup.args = {}
