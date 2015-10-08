function renderChartForUri(uri, id) {

  var dataUri = uri + "/markdownchartconfig";
  if (dataUri.indexOf('/') !== 0) {
    dataUri = '/' + dataUri;
  }

  $.ajax({
    url: dataUri,
    type: "GET",
    success: function(options) {
      options.chart.renderTo = id;
      options.chart.marginRight = 35;
      if (options.customType === 'line') {
        options.xAxis.tickPositioner = function() {
          var positions = [];
          var tick = Math.floor(this.dataMax);
          for (tick; tick >= this.dataMin; tick -= this.tickInterval) {
            positions.push(tick);
          }
          return positions;
        };
      }
      new Highcharts.Chart(options);
    }
  });
}