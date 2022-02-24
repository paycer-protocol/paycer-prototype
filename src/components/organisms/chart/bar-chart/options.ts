export default {
    chart: {
        stacked: true,
        events: {},
        toolbar: {
            show: false
        },
    },
    tooltip: {
        enabled: false
    },
    xaxis: {
        categories: [],
        labels: {
            show: true,
            rotate: -45,
            rotateAlways: false,
            hideOverlappingLabels: true,
            showDuplicates: false,
            trim: false,
            minHeight: undefined,
            maxHeight: 120,
            style: {
                fontSize: '10px',
                cssClass: 'apexcharts-xaxis-label',
            },

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
            dataLabels: {
                position: "bottom",
            },
            columnWidth: '90%',
        }
    },
}