
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
    var formSelect = $('#select');
    var atoz = $('.filters__a-z')
    //var atozActive; //Stores the currently active letter in A-Z

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
    //$(atoz).each(function() {
    //    var $this = $(this);
    //    var parentItem = $this.closest('li');
    //    //Set active item so a-z keyword search works from first load
    //    if (parentItem.hasClass('filters__a-z-list-item--active')) {
    //        atozActive = $(this).attr('href');
    //    }
    //    //Set active letter, remove class from previous active, load new results into page and add active class to new letter
    //
    //    //$(this).click(function(e) {
    //    //    e.preventDefault();
    //    //    atozActive = $this.attr('href');
    //    //    loadNewResults(atozActive);
    //    //    //if input contains keywords include query in Ajax
    //    //    //if ($('#input-keywords').val()) {
    //    //    //    loadNewResults(atozActive + "&query="  + $('#input-keywords').val())
    //    //    //} else {
    //    //    //    loadNewResults(atozActive);
    //    //    //}
    //    //    //$(atoz).each(function() {
    //    //    //    var parentItem = $(this).closest('li');
    //    //    //    if (parentItem.hasClass('filters__a-z-list-item--active')) {
    //    //    //        parentItem.removeClass('filters__a-z-list-item--active');
    //    //    //    }
    //    //    //});
    //    //    //$(parentItem).addClass('filters__a-z-list-item--active');
    //    //});
    //});

    $(atoz).on('change', '.filters__a-z-list input', function(e) {
        submitForm();
    });

    //Bind form submission to store form data and run ajax function
    $(form).submit(function(e) {
        e.preventDefault();
        //If includes a-z parameter then include it in URL to ajax
        //if ((window.location.search.indexOf('az=') > -1) && (atozActive)) {
        //    var url = atozActive + "&" + $(form).serialize();
        //} else {
            var url = (window.location.pathname) + '?' + $(form).serialize();
        //}

        //Detect descriptive text and replace with loading message
        //if ($('form').find('.search-page__results-text').html()) {
            $('.search-page__results-text').empty();
            $('.search-page__results-text').append('Loading...');
            loadNewResults(url);
        //} else {
        //    loadNewResults(url);
        //}
    });

})