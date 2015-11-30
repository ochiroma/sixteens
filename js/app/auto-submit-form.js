
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
    var form = $('form#form');
    var formDates = form.find('input[type="text"]');
    var formCheckboxContainer = form.find('.js-checkbox-container'); //static container needed for delegated event handlebars
    var formCheckboxes = formCheckboxContainer.find('input[type="checkbox"]');
    var formKeywords = form.find('#input-keywords');
    var formSelect = $('select');
    var formAtoZ = $('.filters__a-z');

    //Bind change/click events
    $(formDates).each(function () {
        $(this).change(function() {
            submitForm();
        });
    });
    $(formCheckboxContainer).on('change', formCheckboxes, function() {
        submitForm();
    });
    $(formKeywords).on('change paste keyup', timedSubmit);
    $(formSelect).change(function() {
        submitForm();
    });
    $(formAtoZ).on('change', '.filters__a-z-list input', function() {
        submitForm();
    });

    //Bind form submission to store form data and run ajax function
    $(form).submit(function(e) {
        e.preventDefault();
        var url = (window.location.pathname) + '?' + $(form).serialize();
        $('.search-page__results-text').empty();
        $('.search-page__results-text').append('Loading...');
        loadNewResults(url);
    });

});