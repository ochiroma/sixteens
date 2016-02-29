$(window).load(function() {
    if ($('.timeseries__chart').length == 0) {
        // Enhance markdown charts
        $('.highcharts-container').each(function () {
            highchartsAccessibilityAttrs($(this), 'Chart representing data available in following XLS or CSV download');
        });
    } else {
        // Do accessibility goodness to T5
        timeseriesAccessibiliyAttrs()
    }
});


// Hide markdown highcharts from screen readers and advise that data in available in xls/csv format
function highchartsAccessibilityAttrs(selector, labelText, removeAttrs) {
    if (!removeAttrs) {
        selector.attr('aria-label', labelText);
        selector.find('svg').attr('aria-hidden', 'true');
    } else {
        selector.attr('aria-label', '');
        selector.find('svg').attr('aria-hidden', 'false');
    }
}

// Hide time series highchart SVG from screen readers and add label advising that they can get data from table
function timeseriesAccessibiliyAttrs(removeAttrs) {
    highchartsAccessibilityAttrs($('.timeseries__chart'), 'Chart representing data available in table alternative. Select "table" in filters to display table', removeAttrs);
}
