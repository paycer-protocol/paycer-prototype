import React from 'react';
import { Meta } from '@storybook/react';
import theme from '../../../config/theme';
import AlertComponent, { AlertProps } from './alert';

export default {
  title: 'Atom/Alert',
  component: AlertComponent,
  argTypes: {
    dismissible: {
      control: 'boolean',
    },
    show: {
      control: 'boolean',
    },
    onClose: {
      action: 'clicked',
    },
    closeLabel: {
      control: 'string',
    },
  },
} as Meta;

const VariantTemplate: (args) => JSX.Element[] = (args: AlertProps) => (
  theme.colors.map((variant) => <AlertComponent variant={variant} {...args} className="mr-2">{variant}</AlertComponent>)
);

export const Alert = VariantTemplate.bind({});
