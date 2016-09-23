$(function(){
  $.ajax({
    url: ' servlet/rtJsonServlet',
    type: 'GET',
    data: {nodeId:$('.nodelist li.active span').text(), type:$('.typelist li.active').text()},
    success : function(chartData) {
      chartData = JSON.parse(chartData);
      var chartProperties = {
        "caption": "wendu",
        "xAxisName": "Player",
        "yAxisName": "Wickets Taken",
        "rotatevalues": "1",
      };
      apiChart = new FusionCharts({
        type: 'line',
        renderAt: 'linechart',
        width: '800',
        height: '350',
        dataFormat: 'json',
        dataSource: {
          "chart": chartProperties,
          "data": chartData
        }
      });
      apiChart.render();
    }
  });
});