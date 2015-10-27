/**
 * Created by crispin on 21/10/2015.
 */

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


function triggerSort(array, column) {

	//Sort array of table data
	array.sort(sortTable(column));

	//Swaps whether inverse is true or not, so it always does the opposite from the previous click
	inverse = !inverse;

	//Rebuild the table
	buildTable(array);

	//logArray(array);

}


//Get the data array and build the table body from it
function buildTable(array) {
	var tbody = $('#table').find('tbody');
	$(tbody).empty();

	//console.log("/** (" + callCount + ") BUILD STARTED **/");

	for (i = 0; i < array.length; i++) {
		//console.log(array[i]);
		current = array[i];
		tr = $(document.createElement('tr'));
		tbody.append(tr);
		tr.append('<td>' + current.date + '</td>');
		tr.append('<td>' + current.value + '</td>');
	}
	//console.log("/** (" + callCount + ") BUILD FINISHED **/");
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