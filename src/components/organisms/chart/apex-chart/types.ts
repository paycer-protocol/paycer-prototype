export interface ApexChartProps {
    categories?: Array<string>
    series: SeriesType
    height?: number
    onMouseMove?: (event: MouseEvent, chartContext, config) => void
    renderToolTip?: (series, seriesIndex, dataPointIndex, w) => string
    onMouseLeave?: () => void
    seriesColors?: Array<string>
    borderRadius?: number
    isSmall?: boolean
    type: 'area' | 'bar'
}

export type SeriesType = Array<{
    data: Array<number>
    dates: Array<string>
    chainId: number
    name?: string
}>

