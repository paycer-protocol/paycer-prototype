import React from 'react';
import { Story, Meta } from '@storybook/react';
import PieChartComponent, { PieChartProps } from './pie-chart';

export default {
  title: 'Organism/Chart',
  argTypes: {},
} as Meta;

type StoryOptions = Partial<PieChartProps>;

const Template: Story<StoryOptions> = ({ data, colors, dataKey }: StoryOptions) => (
  <PieChartComponent
    data={data}
    colors={colors}
    dataKey={dataKey}
  />
);

export const PieChart = Template.bind({});
PieChart.args = {
  data: [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ],
  colors: [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
  ],
  dataKey: 'value',
};
