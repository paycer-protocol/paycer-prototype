const polygonMonthSeries =  Array.apply(null, Array(30)).map(function(item, index){
    return Math.floor(Math.random() * 100000000)
})

const mainnetMonthSeries =  Array.apply(null, Array(30)).map(function(item, index){
    return Math.floor(Math.random() * 10000000)
})

const allMonthSeries =  Array.apply(null, Array(30)).map(function(item, index){
    return Math.floor(Math.random() * 10000000 * 2)
})

const polygonThreeMonthSeries =  Array.apply(null, Array(90)).map(function(item, index){
    return Math.floor(Math.random() * 100000000)
})

const mainnetThreeMonthSeries =  Array.apply(null, Array(90)).map(function(item, index){
    return Math.floor(Math.random() * 10000000)
})

const allThreeMonthSeries =  Array.apply(null, Array(90)).map(function(item, index){
    return Math.floor(Math.random() * 10000000 * 2)
})


const polygonYearSeries =  Array.apply(null, Array(12)).map(function(item, index){
    return Math.floor(Math.random() * 100000000)
})

const mainnetYearSeries =  Array.apply(null, Array(12)).map(function(item, index){
    return Math.floor(Math.random() * 10000000)
})

const allYearSeries =  Array.apply(null, Array(12)).map(function(item, index){
    return Math.floor(Math.random() * 10000000 * 2)
})


const fetchStakingSeries = (chainIds, timeSection) => {

    if (timeSection === '1y') {
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
        } else if (chainIds.includes(0)) {
            return [
                {
                    chainId: 0,
                    data: allYearSeries
                },
            ]
        }
    }

    if (timeSection === '1m') {

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
        } else if (chainIds.includes(0)) {
            return [
                {
                    chainId: 0,
                    data: allMonthSeries
                },
            ]
        }
    }

    if (timeSection === '3m') {

        if (chainIds.includes(137) && chainIds.includes(1)) {
            return [
                {
                    chainId: 137,
                    data: polygonThreeMonthSeries
                },
                {
                    chainId: 1,
                    data: mainnetThreeMonthSeries
                },
            ]
        } else if (chainIds.includes(137)) {
            return [
                {
                    chainId: 137,
                    data: polygonThreeMonthSeries
                }
            ]
        } else if (chainIds.includes(1)) {
            return [
                {
                    chainId: 1,
                    data: mainnetThreeMonthSeries
                },
            ]
        } else if (chainIds.includes(0)) {
            return [
                {
                    chainId: 0,
                    data: allThreeMonthSeries
                },
            ]
        }
    }
}

export default fetchStakingSeries

