document.addEventListener('turbolinks:load', () => {
  const today = new Date(new Date().setHours(0, 0, 0, 0))
  const a_month_ago = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())

  const disable_dates = ['2019-12-10', '2019-12-20', '2019-12-30', '2020-01-10', '2020-1-20', '2020-01-30']

  flatpickr.localize(flatpickr.l10ns.ja);

  flatpickr('#date-form', {
      disableMobile: true,
      minDate: a_month_ago,
      maxDate: today,
      disable: disable_dates
  });

  let lineLabel = gon.chart_label
  let lineData = gon.chart_data

  const lineChartData = {
      labels: lineLabel,
      datasets: [{
          label: '体重(kg)',
          data: lineData,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          spanGaps: true
      }]
  }

  const lineChartOption = {
      title: {
          display: true,
          text: '折れ線グラフ'
      },
      tooltips: {
          callbacks: {
              title: function (tooltipItems) {
                  return tooltipItems[0].xLabel.replace(/^(\d+).(\d+)$/, ' $1 月 $2 日')
              },
              label: function (tooltipItem) {
                  return '体重: ' + tooltipItem.yLabel + 'kg'
              }
          }
      }
  }

  const lineChartContext = document.getElementById("line-chart").getContext('2d')
  new Chart(lineChartContext, {
      type: 'line',
      data: lineChartData,
      options: lineChartOption
  })

  })