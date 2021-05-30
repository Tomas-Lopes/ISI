
Highcharts.chart('donut', {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45
      }
    },
    title: {
      text: 'Estado dos Projetos'
    },
    subtitle: {
      text: ''
    },
    plotOptions: {
      pie: {
        innerSize: 100,
        depth: 45
      }
    },
    colors: ['#d6743c', '#3c5c74', '#808080'],
    series: [{
      name: 'Nº de Projetos',
      data: [
        ['Aceites', 5],
        ['Total', 8],
        ['Recusados', 3]
        
        
      ]
    }]
  });
