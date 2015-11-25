
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
    var formCheckboxes = form.find('input[type="checkbox"]');
    var formKeywords = form.find('#input-keywords');
    var formSelect = $('#select');
    var atoz = $('.filters__a-z-list-item a')

    //Bind change events to date and keyword inputs
    $(formDates).each(function () {
        $(this).change(function() {
            submitForm();
        });
    });
    $(formCheckboxes).each(function() {
        $(this).change(function() {
            submitForm();
        });
    });
    $(formKeywords).on('change paste keyup', timedSubmit);
    $(formSelect).change(function() {
        submitForm();
    });
    $(atoz).each(function() {
        var $this = $(this);
        var parentItem = $this.closest('li');
        $(this).click(function(e) {
            e.preventDefault();
            var url = $this.attr('href');
            loadNewResults(url);

            $(atoz).each(function() {
                var parentItem = $(this).closest('li');
                if (parentItem.hasClass('filters__a-z-list-item--active')) {
                    parentItem.removeClass('filters__a-z-list-item--active');
                }
            });
            $(parentItem).addClass('filters__a-z-list-item--active');
        });
    })

    //Bind form submission to store form data and run ajax function
    $(form).submit(function(e) {
        e.preventDefault();
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