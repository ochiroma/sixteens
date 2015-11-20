/* File for the usage of the third-party pickadate.js plugin */

$('#input-start-date, #input-end-date').minical({
    offset: {
        x: 0,
        y: 0
    },
    date_format: function(date) {
        var day = ('0' + date.getDate()).slice(-2); //Add zero to beginning of single digit numbers
        var month = ('0' + (date.getMonth() + 1)).slice(-2); //Add zero to beginning of single digit numbers
        return [day, month, date.getFullYear()].join('/');

        //return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/');
    }
});