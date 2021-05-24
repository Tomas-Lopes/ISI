Highcharts.chart('container', {
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
    colors: ['#08d334', '#e4cd05', '#e00404'],
    series: [{
      name: 'Nº de Projetos',
      data: [
        ['Aceites', 8],
        ['Pendentes', 3],
        ['Recusados', 1]
      ]
    }]
  });
  