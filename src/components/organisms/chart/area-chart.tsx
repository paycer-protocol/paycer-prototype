import React from 'react';
import { AreaChart as BaseAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export interface AreaChartData {
    name: string
    value: number
}

export interface AreaChartProps {
    data: AreaChartData[]
    containerWidth?: number
    containerHeight?: number
    strokeColor?: string
    fillColor?: string
}


const AreaChart = (props: AreaChartProps) => {
    const {
        data,
        containerWidth = 750,
        containerHeight = 500,
        strokeColor = '#8884d8',
        fillColor = '#8884d8',
    } = props

    return (
        <ResponsiveContainer width={containerWidth} height={containerHeight}>
            <BaseAreaChart
                width={containerWidth}
                height={containerHeight}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="uv"
                    stroke={strokeColor}
                    fill={fillColor}
                />
            </BaseAreaChart>
        </ResponsiveContainer>
    )
}

export default AreaChart
