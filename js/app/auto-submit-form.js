
$(function() {
    //TODO - Set/cache reused selectors

    //Function to submit form
    function submitForm() {
        $(form).trigger('submit');
    }

    //Find form/filters to auto-submit & ajax results
    var form = $('form#form');
    var filters = $('#form .filters');

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
        $(formKeywords).on('change paste keyup search', timedSubmit);
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
        var formCheckboxes = filters.find('input[type="checkbox"]');
        //TODO - Loop each checkbox and check if in a list or on own. Then wrap with js-container (if it doesn't already have one)
        //$(formCheckboxes).each(function() {
        //    var parentList = $(this).parentsUntil($(filters), 'ul');
        //    var hasJsContainer = $(this).parentsUntil($(filters), '.js-checkbox-container');
        //    if (parentList.length > 0 && hasJsContainer.length < 1) {
        //        parentList.wrap('<div class="js-checkbox-container"></div>');
        //    } else if (hasJsContainer.length < 1) {
        //        $(this).parent().wrap('<div class="js-checkbox-container"></div>');
        //    }
        //});
        var formCheckboxContainer = form.find('.js-checkbox-container');
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
        return false;
    });

});