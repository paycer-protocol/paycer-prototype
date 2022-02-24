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

    console.log(time)

    if (time === 'y') {

        if (chainIds.includes(137) && chainIds.includes(1)) {
            return [
                {
                    chainId: 137,
                    data: polygonYearSeries
                },
                {
                    chainId: 1,
                    data: mainnetYearSeries
                },
            ]
        } else if (chainIds.includes(137)) {
            return [
                {
                    chainId: 137,
                    data: polygonYearSeries
                }
            ]
        } else if (chainIds.includes(1)) {
            return [
                {
                    chainId: 1,
                    data: mainnetYearSeries
                },
            ]
        }
    }

    if (time === '1m') {

        if (chainIds.includes(137) && chainIds.includes(1)) {
            return [
                {
                    chainId: 137,
                    data: polygonMonthSeries
                },
                {
                    chainId: 1,
                    data: mainnetMonthSeries
                },
            ]
        } else if (chainIds.includes(137)) {
            return [
                {
                    chainId: 137,
                    data: polygonMonthSeries
                }
            ]
        } else if (chainIds.includes(1)) {
            return [
                {
                    chainId: 1,
                    data: mainnetMonthSeries
                },
            ]
        }
    }

    if (chainIds.includes(0)) {
        return [
            {
                chainId: 0,
                data: allMonthSeries
            },
        ]
    }
}

export default fetchSeries

