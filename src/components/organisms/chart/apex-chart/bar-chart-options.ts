export default {
    colors: [],
    chart: {
        stacked: true,
        events: {},
        toolbar: {
            show: false
        },
    },
    tooltip: {
        enabled: true
    },
    xaxis: {
        categories: [],
        labels: {
            show: false
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        labels: {
            show: false,
        }
    },

    grid: {
        borderColor: 'transparent'
    },
    dataLabels: {
        enabled: false,
        dropShadow: {
            enabled: true,
            left: 2,
            top: 2,
            opacity: 0.5
        },
        style: {
            fontSize: '12px',
            fontWeight: 'normal',
            color: '#FFF'
        },
    },
    plotOptions: {
        bar: {
            borderRadius: 2,
            dataLabels: {
                position: "bottom",
            },
            columnWidth: '50%',
        }
    },
    legend: {
        show: false,
    }
}