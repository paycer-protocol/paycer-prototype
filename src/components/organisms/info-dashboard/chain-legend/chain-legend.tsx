import React from 'react'
import styled, { css } from 'styled-components'
import { SeriesType } from '@components/organisms/chart/bar-chart/bar-chart'

export interface ChainLegendProps {
    colors: Array<string>
    series: SeriesType
}

export const ChainLegendItem = styled.div`
    span { padding-left: 10px; }
    ${props => props.color && css`
        &:before {
            background: ${props.color};
            width: 15px;
            height: 15px;
            content: "";
        }
    `}
`




const ChainLegend = (props: ChainLegendProps) => {

    const { series, colors } = props

    return (
        <div className="d-flex align-items-center">
            {series.map((s, key) => (
                <ChainLegendItem className="d-flex align-items-center ms-4" color={colors[key]}>
                    <span>{s.name}</span>
                </ChainLegendItem>
            ))}
        </div>
    )
}

export default ChainLegend
