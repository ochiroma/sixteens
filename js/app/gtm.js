
// gtm dataLayer push functions

// Tracking time form selections in the cmd journey
var timeForm = $('#time-form'), selectedTimeType;

function formSubmit(){
    timeForm.submit(function () {
      selectedTimeType = $('input[type=radio]:checked', timeForm).val();
      var formData = $(this).serializeArray();
      gtmDataLayer(formData);
    });
}

function gtmDataLayer(data) {
    if(selectedTimeType === "latest"){
      var date = data[1].value;
      window.dataLayer.push({
        'event' : 'SaveTimeFilter',
        'timeFilterType ' : 'I just want the latest data',
        'startMonth' : date,
        'endMonth' : date,
        'numberOfMonths' : '1'
      });
    }

    if(selectedTimeType === "single"){
      var date = data[2].value + ' ' + data[3].value;
      window.dataLayer.push({
        'event' : 'SaveTimeFilter',
        'timeFilterType ' : 'Add a single month',
        'startMonth' : date,
        'endMonth' : date,
        'numberOfMonths' : '1'
      });
    }

    if(selectedTimeType === "range"){
      var startDate = data[4].value + ' ' + data[5].value,
          endDate = data[6].value + ' ' + data[7].value;

      // Convert dates to calculate difference
      var newStart = new Date(startDate),
          newEnd = new Date(endDate),
          months;
          months = (newEnd.getFullYear() - newStart.getFullYear()) * 12;
          months += newEnd.getMonth();

      window.dataLayer.push({
        'event' : 'SaveTimeFilter',
        'timeFilterType ' : 'Add a range of months',
        'startMonth' : startDate,
        'endMonth' : endDate,
        'numberOfMonths' : months
      });
    }

    if(selectedTimeType === "list"){
      var startDate = data[3].value + ' ' + data[4].value,
          endDate = data[5].value + ' ' + data[6].value,
          dateCount = $('input[type=checkbox]:checked', timeForm).length;

      window.dataLayer.push({
        'event' : 'SaveTimeFilter',
        'timeFilterType ' : 'Add months from a list',
        'startMonth' : startDate,
        'endMonth' : endDate,
        'numberOfMonths' : dateCount
      });
    }
}


if(timeForm){
  formSubmit();
}
