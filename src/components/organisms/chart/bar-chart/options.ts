export default {
    chart: {
        events: {},
        toolbar: {
            show: false
        },
    },
    tooltip: {

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
    fill: {
        type: "gradient",
        gradient: {
            type: "vertical",
            shadeIntensity: 0.5,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 90],
            colorStops: [
                {
                    offset: 0,
                    color: "rgba(133, 12, 167, 1)",
                    opacity: 0.8
                },
                {
                    offset: 90,
                    color: "rgba(66, 1, 220, 1)",
                    opacity: 0.8
                },

            ]
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
            columnWidth: '60%'
        }
    },
}