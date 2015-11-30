
$(function() {

    //Function to submit form
    function submitForm() {
        $(form).trigger('submit');
    }

    //Find form to auto-submit & ajax results
    var form = $('form#form');

    //Delay form submit so user has enough time to type without constant refreshes
    var timer;
    function timedSubmit() {
        clearTimeout(timer);
        timer = setTimeout(submitForm, 500);
    }

    //Find date pickers and bind events
    if ($('#input-start-date') || $('#input-end-date')) {
        var formDates = form.find('input[type="text"]');
        $(formDates).each(function () {
            $(this).change(function() {
                submitForm();
            });
        });
    }

    //Find keyword input and bind events
    if ('#input-keywords') {
        var formKeywords = form.find('#input-keywords');
        $(formKeywords).on('change paste keyup', timedSubmit);
    }

    //Find and bind events to drop-down select inputs
    if ('select') {
        var formSelect = $('select');
        $(formSelect).change(function () {
            submitForm();
        });
    }

    //Wrap static container around checkboxes for static element to bind events to
    if (form.has('.filters input[type="checkbox"]')) {
        var formCheckboxContainer = form.find('.js-checkbox-container');
        var formCheckboxes = $('#form.filters input[type="checkbox"]').find('input[type="checkbox"]'); //Seems inefficient to find once already selecting - means only one though, TODO get this select just one so doesn't have to loop for each checkbox below
        $(formCheckboxes).each(function() {
           $(this).closest('ul').wrap('<div class="js-checkbox-container"></div>')
        });
        $(formCheckboxContainer).on('change', formCheckboxes, function() {
            submitForm();
        });
    }

    //The same as above but for a-z
    if ('.filters__a-z') {
        $('.filters__a-z').wrap('<div class="js-atoz-container"></div>')
        var formAtoZ = $('.js-atoz-container');
        $(formAtoZ).on('change', '.filters__a-z input', function() {
            submitForm();
        });
    }

    //Bind form submission to store form data and run ajax function
    $(form).submit(function(e) {
        e.preventDefault();
        var url = (window.location.pathname) + '?' + $(form).serialize();
        $('.search-page__results-text').empty();
        $('.search-page__results-text').append('Loading...');
        loadNewResults(url);
    });

});