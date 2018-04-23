// Progressive enhancement for cmd downloads

// Check that we're on the preview page and the downloads don't already exist
if ($('#preview-and-download').length) {
    $('#no-js-refresh').remove();
    if(!$('#excel-download').length) {
        getDownloadFiles();
    }
}

// Vars
var loader = $('.loader-svg'),
    message = $('<h3 class="margin-bottom">There has been an error creating your files. Try refreshing the page.</h3>' +
                '<a class="btn btn--primary btn--thick margin-bottom--4 btn--focus font-size--19" href="' + window.location.pathname + '">Refresh page</a>'),
    count = 0;

// Call to the filter api
function getDownloadFiles() {
  $.ajax({
    url: window.location.pathname + '.json',
    dataType: 'json',
    contentType: 'application/json',
    error: function(response) {
        // Show error message if we don't get a response
        message.appendTo('.downloads-block');
      
    },
    success: function(response) {
      var downloads = response.downloads;
      // Check if the response has the file data
      if (typeof downloads != "undefined"
          && typeof downloads.csv != "undefined" && typeof downloads.xls != "undefined"
          && typeof downloads.xls.href != "undefined" && downloads.xls.href != ''
          && typeof downloads.csv.href != "undefined" && downloads.csv.href != '') {
        loader.remove();
        $('#other-downloads').removeClass('js-hidden');
        addFilesToPage(response);
      } else {
        // Poll the server every 2 seconds up to a maximum of 60 attempts (2 minutes)
        if (count < 60) {
            count++;
            loader.removeClass('js-hidden');
            setTimeout(function() { getDownloadFiles(); }, 2000); 
        } else {
            // Show an error message if the files aren't created after 60 attempts
            loader.remove();
            message.appendTo('.downloads-block');
        }
      }
    },
  });
}

function addFilesToPage(files) {
    // Get the xls data and create the link
    var excelURL = files.downloads.xls.url,
        excelFileSize = files.downloads.xls.size,
        excelFile = $('<a id="excel-download" class="btn btn--primary btn--thick margin-bottom--4 btn--focus font-size--19" href=" ' + excelURL + '"><strong>Excel file</strong> <span class="font-size--14">('+ formatBytes(excelFileSize) +')</span></a>');
    // Get the csv data and create the link
    var csvURL = files.downloads.csv.url,
        csvFileSize = files.downloads.csv.size,
        csvFile = $('<li class="padding-left--1 margin-top--0 margin-bottom--1 white-background clearfix">' +
                    '<span class="inline-block width--24 padding-top--2">Filtered dataset (<span class="uppercase">csv</span> format)</span>' +
                    '<div class="width--12 inline-block float-right text-right">' +
                    '<a id="csv-download" class="btn btn--primary margin-top--1 margin-bottom--1 margin-right--half width--11" href="' + csvURL + '"><strong>csv</strong> ('+ formatBytes(csvFileSize) +')</a></div></li>');
    
    // Append the files to the page
    excelFile.appendTo('#excel-file');
    csvFile.prependTo('#other-downloads__list');
}

// Format the bytes to be readable
function formatBytes(bytes) {
    var k = 1024,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
 }