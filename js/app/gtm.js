
// gtm dataLayer push functions

// Tracking time form selections in the cmd journey
var timeForm = $('#time-form'), formData;

function formSubmit(){
    timeForm.submit(function () {
      formData = $(this).serializeArray().reduce(function(obj, item) {
          obj[item.name] = item.value;
          return obj;
      }, {});
      gtmDataLayer(formData);
    });
}


function gtmDataLayer(data) {
  var selectedTimeType = data["time-selection"];
  console.log(data);

  switch(selectedTimeType) {
    case "latest":
      var date = data["latest-month"] + ' ' + data["latest-year"];

      window.dataLayer.push({
        'event' : 'SaveTimeFilter',
        'timeFilterType' : 'I just want the latest data',
        'startMonth' : date,
        'endMonth' : date,
        'numberOfMonths' : '1'
      });
      break;

      case "single":
        var date = data["month-single"] + ' ' + data["year-single"];

        window.dataLayer.push({
          'event' : 'SaveTimeFilter',
          'timeFilterType' : 'Add a single month',
          'startMonth' : date,
          'endMonth' : date,
          'numberOfMonths' : '1'
        });
      break;


      case "range":
        var startDate = data["start-month"] + ' ' + data["start-year"],
            endDate = data["end-month"] + ' ' + data["end-year"];

        // Convert dates to calculate difference
        var newStart = new Date(startDate),
            newEnd = new Date(endDate),
            months;
            months = (newEnd.getFullYear() - newStart.getFullYear()) * 12;
            months += newEnd.getMonth();

        window.dataLayer.push({
          'event' : 'SaveTimeFilter',
          'timeFilterType' : 'Add a range of months',
          'startMonth' : startDate,
          'endMonth' : endDate,
          'numberOfMonths' : months
        });
      break;

      case "list":
      var startDate = $('.checkbox-group').find('input[type=checkbox]:checked', timeForm).last().val(),
          endDate = $('.checkbox-group').find('input[type=checkbox]:checked', timeForm).first().val(),
          dateCount = $('input[type=checkbox]:checked', timeForm).length;

        window.dataLayer.push({
          'event' : 'SaveTimeFilter',
          'timeFilterType' : 'Add months from a list',
          'startMonth' : startDate,
          'endMonth' : endDate,
          'numberOfMonths' : dateCount
        });
      break;
    }
}


if(timeForm){
  formSubmit();
}
