var renderSparkline = function(data, chartContainer) {
	var sparklinename = 'sparkline' + data.description.cdid;
	var chart = window[sparklinename];
	// var chartContainer = $('[data-sparkline-'+data.description.cdid + ']');

	renderChart();

	function renderChart() {
		for (var i = data.series.length - 1; i >= 0; i--) {
			var y = data.series[i].y
			data.series[i].y = y ? y : null // highcarts does not play well with undefined y value
		};
		chart.series[0].data = data.series;
		chartContainer.highcharts(chart);
	}

};