
$(function() {

    //Function to submit form
    function submitForm() {
        $(form).trigger('submit');
    }

    //Delay form submit so user has enough time to type without constant refreshes
    var timer;
    function timedSubmit() {
        clearTimeout(timer);
        timer = setTimeout(submitForm, 500);
    }

    //Find form and all inputs
    var form = $('form#filters');
    var formDates = form.find('input[type="text"]');
    var formCheckboxes = form.find('input[type="checkbox"]');
    var formKeywords = form.find('#input-keywords');
    var formSelect = $('#select');
    var formClear = $()

    //Bind change events to date and keyword inputs
    $(formDates).each(function () {
        $(this).change(function() {
            submitForm();
        });
    });
    $(formCheckboxes).each(function() {
        $(this).change(function() {
            form = form.closest('form');
            //timedSubmit();
            submitForm();
        });
    });
    $(formKeywords).on('change paste keyup', timedSubmit);
    $(formSelect).change(function() {
        form = $(form).closest('form');
        submitForm();
    });

    //Bind form submission to store form data and run ajax function
    $(form).submit(function(e) {
        e.preventDefault();
        //TODO Get all list pages and search page text consistently marked up so we don't have to detect which type is there. Template should be the same mark-up mostly
        var url = (window.location.pathname) + '?' + $(form).serialize();

        //Detect descriptive text and replace with loading message
        if ($('form').find('.search-page__results-text').html()) {
            $('.search-page__results-text').empty();
            $('.search-page__results-text').append('Loading...');
            loadNewResults(url);
        } else {
            loadNewResults(url);
        }
    });

})