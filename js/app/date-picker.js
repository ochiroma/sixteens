//Stored in function so minical can be initialised again after ajax (ie tabs on list pages)

function initialiseMinical() {
    $('#input-start-date, #input-end-date').minical({
        offset: {
            x: 0,
            y: 0
        },
        date_format: function(date) {
            var day = ('0' + date.getDate()).slice(-2); //Add zero to beginning of single digit numbers
            var month = ('0' + (date.getMonth() + 1)).slice(-2); //Add zero to beginning of single digit numbers
            return [day, month, date.getFullYear()].join('/');
        },
        date_changed: function() {
            //Send change event for auto-submit js to detect
            $(this).change();
        }
    });
}

initialiseMinical();