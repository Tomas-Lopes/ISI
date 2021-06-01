// Create the chart
Highcharts.chart('column', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Tipo de Pedidos'
    },
    subtitle: {
      text: ''
    },
    accessibility: {
      announceNewData: {
        enabled: true
      }
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      title: {
        text: 'Nr Pedidos'
      }
  
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y}'
        }
      }
    },
  
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> pedidos<br/>'
    },
    colors: ['#e6e8e8','#3c5c74', '#808080', '#7c949c', '#d6743c', '#04344c'],
    series: [
      {
        name: "",
        colorByPoint: true,
        data: [
          {
            name: "Obras rodoviarias",
            y: 1,
            drilldown: "Obras rodoviarias"
          },
          {
            name: "Obras Maritimas",
            y: 0,
            drilldown: "Obras Maritimas"
          },
          {
            name: "Habitacao e construcao civil",
            y: 4,
            drilldown: "Habitacao e construcao civil"
          },
          {
            name: "Requalificacao urbana",
            y: 1,
            drilldown: "Requalificacao urbana"
          },
          {
            name: "Centros logisticos",
            y: 2,
            drilldown: "Centros logisticos"
          },
          {
            name: "Complexos desportivos",
            y: 1,
            drilldown: "Complexos desportivos"
          }
        ]
      }
    ]
  });