import React from 'react'
import { Story, Meta } from '@storybook/react'
import AreaChartComponent, { AreaChartProps } from './area-chart'

export default {
  title: 'Organism/Chart',
  argTypes: {},
} as Meta

type StoryOptions = Partial<AreaChartProps>

const Template: Story<StoryOptions> = ({ data }: StoryOptions) => (
  <AreaChartComponent data={data} />
)

export const AreaChart = Template.bind({})
AreaChart.args = {
  data: [
    {
      name: 'Jan',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Feb',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Mar',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Apr',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Mai',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Jun',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Jul',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ],
}
