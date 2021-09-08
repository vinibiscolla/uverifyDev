
$(document).ready(function () {

  //Timer para dar tempo de carregar a lib ptbr e não quebrar a chamada das traduções
//   carregarFornecedores()

});

function carregarChartWorker() {

 
  
}

function carregarChartSupplier() {

 
}

Highcharts.chart('workerChartContainer', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Total de trabajadores analizados'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f} Qty</b>'
    },
    accessibility: {
        point: {
            valueSuffix: 'Qty'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} Qty'
            }
        }
    },
    credits: {
    	enabled: false
		},
    series: [{
        name: 'Documentos',
        colorByPoint: true,
        data: [{
            name: 'Válido',
            y: 70,
            sliced: true,
            selected: true,
            color: '#28A745'
        }, {
            name: 'Pendiente',
            y: 16,
            color: '#FFC107'
        }, {
            name: 'Inválido',
            y: 14,
            color:'#DC3545'
        }]
    }]
});

Highcharts.chart('supplierChartContainer', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Total de proveedores analizados'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f} Qty</b>'
    },
    accessibility: {
        point: {
            valueSuffix: 'Qty'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} Qty'
            }
        }
    },
    credits: {
    	enabled: false
		},
    series: [{
        name: 'Documentos',
        colorByPoint: true,
        data: [{
            name: 'Válido',
            y: 81,
            sliced: true,
            selected: true,
            color: '#28A745'
        }, {
            name: 'Pendiente',
            y: 8,
            color: '#FFC107'
        }, {
            name: 'Inválido',
            y: 11,
            color: '#DC3545'
        }]
    }]
});

Highcharts.chart('workerColumnsContainer', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Documentos analizados por proveedor'
    },
    subtitle: {
        text: ''
    },
    credits: {
    	enabled: false
		},
    xAxis: {
        allowDecimals: false,
        categories: [
            '0EAH',
            'CLSO',
            'EHSE',
            'STTS',
            'FUES',
            'STR1',
            'P2HW',
            'RHSOLU'
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Qty'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} Qty </b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Válido',
        data: [12, 21, 24, 25, 27, 22, 26, 28],
        color: '#28A745'

    }, {
        name: 'Inválido',
        data: [4, 7, 8, 3, 6, 4, 5, 4],
        color: '#DC3545'

    }, {
        name: 'Pendiente',
        data: [4, 3, 3, 4, 4, 4, 3, 2],
        color: '#FFC107'

    }]
});

Highcharts.chart('supplierColumnsContainer', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Documentos del proveedor'
    },
    xAxis: {
        allowDecimals: false,
        categories: ['ISO-9001', 'ISO-9002', 'ISO-18001', 'ISO-14000']
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Válido',
        data: [5, 3, 4, 7],
        color: '#28A745'
    }, {
        name: 'Inválido',
        data: [2, 2, 3, 1],
        color: '#DC3545'
    }, {
        name: 'Pendiente',
        data: [3, 4, 4, 5],
        color: '#FFC107'
    }]
});
