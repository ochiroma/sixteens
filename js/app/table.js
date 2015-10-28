/**
 * Created by crispin on 21/10/2015.
 */

function triggerSort(array, column, frequency) {

	// If frequency is 'months' then replace month values with actual numbers (stops alphabetical ordering breaking order)
	if (frequency == "months") {
		$.each(array, function (index) {
			//Select the date value of each object
			var date = array[index].date;

			//Replace month string with equivalent number
			array[index].date = date.replace('JAN', '01').replace('FEB', '02').replace('MAR', '03').replace('APR', '04').replace('MAY', '05').replace('JUN', '06').replace('JUL', '07').replace('AUG', '08').replace('SEP', '09').replace('OCT', '10').replace('NOV', '11').replace('DEC', '12');

		});

		//Sort array of table data
		array.sort(sortTable(column));

		// Now months have been sorted correct switch numbers back to month
		$.each(array, function(index){
			var date = array[index].date;
			var year = date.substr(0,date.indexOf(' '));
			var month = date.substr(date.indexOf(' ')+1);

			//Revert number back to month string
			array[index].date = year + " " + month.replace('01', 'JAN').replace('02', 'FEB').replace('03', 'MAR').replace('04', 'APR').replace('05', 'MAY').replace('06', 'JUN').replace('07', 'JUL').replace('08', 'AUG').replace('09', 'SEP').replace('10', 'OCT').replace('11', 'NOV').replace('12', 'DEC');

		});

	} else {
		//If not months then just sort array as normal
		array.sort(sortTable(column));

	}


	//Swaps whether inverse is true or not, so it always does the opposite from the previous click
	inverse = !inverse;

	//Rebuild the table with sorted array
	buildTable(array);

}

//Sorts table contents. Argument 'column' defines which column is being sorted
function sortTable(column) {
	return function(a, b) {
		var aData = a[column];
		var bData = b[column];

		//If inverted it sorts the opposite direction
		if (inverse == true) {
			return ((aData > bData) ? -1 : ((aData < bData) ? 1 : 0));
		} else {
			return ((aData < bData) ? -1 : ((aData > bData) ? 1 : 0));
		}

	}
}

//Get the data array and build the table body from it - TODO Should reuse renderTable function in linechart.js if possible
function buildTable(array) {
	var tbody = $('.table').find('tbody');
	$(tbody).empty();

	//Defines which class to add to header so styling can be hooked onto it
	if (inverse == true) {
		headerClass = 'sorted--desc';
	} else {
		headerClass = 'sorted--asc';
	}

	for (i = 0; i < array.length; i++) {
		//console.log(array[i]);
		current = array[i];
		tr = $(document.createElement('tr')).addClass('table__row');
		tbody.append(tr);
		tr.append('<td class="table__data">' + current.date + '</td>');
		tr.append('<td class="table__data">' + current.value + '</td>');
	}
}

//TEST TO SHOW WHAT DATA IS BEING PUSHED AT EACH CHART/TABLE CHANGE

//var callCount = 0;
//
//function logArray(array) {
//	callCount++;
//	console.log("/** (" + callCount + ") START GETTING DATA **/");
//	$.each(array, function (index){
//		console.log(array[index]);
//	})
//	console.log("/** (" + callCount + ") FINISHED GETTING DATA **/");
//}

//END OF TEST CODE


