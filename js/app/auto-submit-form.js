
function autoSubmitForm() {
    //Function to submit form
    function submitForm(element) {
        var elementForm = $(element).closest(form);
        $(elementForm).trigger('submit');
    }

    //Variables
    var form = '.js-auto-submit__form',
        input = '.js-auto-submit__input',
        $keywordSearch = $('input[type="search"].js-auto-submit__input'),
        $clearAll = $(form).find('a[value="Reset"]'),
        $atozContainer = $('.js-atoz-container'),
        $selectUpdated = $('#select-updated'),
        url,
        timer,
        $trigger;

    // Hide submit button
    $('.js-submit-button').hide();

    // Keyword search auto-submit
    $keywordSearch.on('keyup', function (e) {
        if (!(e.keyCode == '9')) { // Don't submit on tab
            // Timed to allow for typing to finish
            var $this = $(this);
            clearTimeout(timer);
            timer = setTimeout(function () {
                submitForm($this);
            }, 500);
        }
    });
    $(form).on('paste search', $keywordSearch, function (e) {
        // Submit instantly on paste/clear
        var $this = $(this);
        submitForm($this);
    });

    // Auto-submit instantly for all other elements
    $(form).on('change', input, function (e) {
        var $target = $(e.target);
        var $targetId = $(e.target).attr('id');
        $trigger = $target;
        if ($targetId !== $keywordSearch.attr('id') && $targetId !== 'select-updated') { //Don't submit again after keyword change
            submitForm($target);
        } else if ($targetId == $selectUpdated.attr('id')) { //Clear custom dates on timeseries tool if 'Custom' not selected
            if ($selectUpdated.val() != 'custom') {
                $('#input-start-date, #input-start-date').each(function () {
                    $(this).val('');
                });
            }
            submitForm($target)
        }
    });

    // Commented out as not sure this is necessary and adds complexity to the code
    //Bind clear form click event
    //$clearAll.click(function (e) {
    //    e.preventDefault();
    //    url = $(this).attr('href');
    //    loadNewResults(url, true);
    //});

    // Using generic js-auto-submit__input class instead
    //Auto-submit A-Z filters
    //if ($atozContainer.length > 0) {
    //    $atozContainer.on('change', '.filters__a-z input', function (e) {
    //        var $target = $(e.target);
    //        submitForm($target);
    //    });
    //}

    //Bind form submission to store form data and run ajax function
    $(form).submit(function (e) {
        e.preventDefault();
        url = (window.location.pathname) + '?' + $(form).serialize();
        loadNewResults(url, $trigger);
        $trigger = undefined; // reset the focus element
        return false;
    });

}


$(function() {
    if (!$('body').hasClass('viewport-sm')) { // on medium viewport and up auto-submit filters form
        autoSubmitForm();
    }
});