import React from 'react'
import { Meta } from '@storybook/react'
import theme from '../../../config/theme'
import TableComponent, { TableProps } from './table'

export default {
  title: 'Molecule/Table',
  component: TableComponent,
  argTypes: {
    striped: { control: 'boolean' },
    bordered: { control: 'boolean' },
    borderless: { control: 'boolean' },
    hover: { control: 'boolean' },
    responsive: { control: 'boolean' },
    size: { control: 'select', options: theme.sizes },
    variant: { control: 'select', options: theme.colors },
  },
} as Meta

const Template: (args: TableProps) => JSX.Element = (args: TableProps) => (
  <TableComponent {...args}>
    <thead>
      <tr>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Username</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <td>3</td>
        <td colSpan={2}>Larry the Bird</td>
        <td>@twitter</td>
      </tr>
    </tbody>
  </TableComponent>
)

export const Table = Template.bind({})
Table.args = {
  size: 'md',
  variant: 'light',
}
