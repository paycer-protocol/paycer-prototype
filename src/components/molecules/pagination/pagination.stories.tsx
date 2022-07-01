import React from 'react';
import { Meta } from '@storybook/react';
import theme from '../../../config/theme';
import Pagination, { PaginationProps, PageItemProps } from './pagination';

export default {
  title: 'Molecule/Pagination',
  component: Pagination,
  argTypes: {
    size: { control: 'select', options: theme.sizes },
    variant: { control: 'select', options: theme.colors },
  },
} as Meta;

const PaginationTemplate: (args: PaginationProps) => JSX.Element = (args: PaginationProps) => (
  <Pagination {...args}>
    <Pagination.First />
    <Pagination.Prev />
    <Pagination.Item>{1}</Pagination.Item>
    <Pagination.Ellipsis />

    <Pagination.Item>{10}</Pagination.Item>
    <Pagination.Item>{11}</Pagination.Item>
    <Pagination.Item active>{12}</Pagination.Item>
    <Pagination.Item>{13}</Pagination.Item>
    <Pagination.Item disabled>{14}</Pagination.Item>

    <Pagination.Ellipsis />
    <Pagination.Item>{20}</Pagination.Item>
    <Pagination.Next />
    <Pagination.Last />
  </Pagination>
);

const ItemTemplate: (args: PageItemProps) => JSX.Element = (args: PaginationProps) => (
  <Pagination>
    <Pagination.Item {...args}>{10}</Pagination.Item>
  </Pagination>
);

export const Default = PaginationTemplate.bind({});
Default.args = {
  size: 'md',
};

export const PageItem = ItemTemplate.bind({});
PageItem.args = {
  active: false,
  disabled: false,
};
