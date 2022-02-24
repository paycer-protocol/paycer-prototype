import { ChainId } from '@usedapp/core'

const polygonYearSeries =  Array.apply(null, Array(12)).map(function(item, index){
    return Math.floor(Math.random() * 10000000)
})

const mainnetYearSeries =  Array.apply(null, Array(12)).map(function(item, index){
    return Math.floor(Math.random() * 10000000)
})

const polygonMonthSeries =  Array.apply(null, Array(30)).map(function(item, index){
    return Math.floor(Math.random() * 10000000)
})

const mainnetMonthSeries =  Array.apply(null, Array(30)).map(function(item, index){
    return Math.floor(Math.random() * 10000000)
})

const allMonthSeries =  Array.apply(null, Array(30)).map(function(item, index){
    return Math.floor(Math.random() * 10000000 * 2)
})


const fetchSeries = (chainIds, time) => {

    if (time === 'y') {

        if (chainIds.includes(137) && chainIds.includes(1)) {
            return [
                {
                    name: 'Polygon',
                    data: polygonYearSeries
                },
                {
                    name: 'Etherum',
                    data: mainnetYearSeries
                },
            ]
        } else if (chainIds.includes(137)) {
            return [
                {
                    name: 'Polygon',
                    data: polygonYearSeries
                }
            ]
        } else {
            return [
                {
                    name: 'Etherum',
                    data: mainnetYearSeries
                },
            ]
        }
    }

    if (time === '1m') {

        if (chainIds.includes(137) && chainIds.includes(1)) {
            return [
                {
                    name: 'Polygon',
                    data: polygonMonthSeries
                },
                {
                    name: 'Etherum',
                    data: mainnetMonthSeries
                },
            ]
        } else if (chainIds.includes(137)) {
            return [
                {
                    name: 'Polygon',
                    data: polygonMonthSeries
                }
            ]
        } else {
            return [
                {
                    name: 'Etherum',
                    data: mainnetMonthSeries
                },
            ]
        }
    }

    if (time === 'all' && !chainIds.length) {
        return [
            {
                name: 'All',
                data: allMonthSeries
            },
        ]
    }
}

export default fetchSeries

