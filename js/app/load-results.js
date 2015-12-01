/**
 * Created by crispin on 20/11/2015.
 */
/* Load search/list results into a page without refreshing (eg when changing a filter) */

//TODO - Set/cache reused selectors

function loadNewResults(url) {
    $.ajax({
        url: url,
        success: function(result) {
            console.log(result);

            //Results
            var newResults = $(result).find('.results').html();
            var resultsText = $(result).find('.search-page__results-text').html();
            replaceResults(url, newResults, resultsText);

            //Filters
            if ($(result).has('.js-checkbox-container')) {
                var filters = $(result).find('.js-checkbox-container');
                $(filters).each(function() {
                    replaceFilters($(this).html());
                });
            }
            if ($(result).has('.js-atoz-container')) {
                var atozFilters = $(result).find('.filters__a-z');
                replaceFilters(atozFilters);
            }
        }
    });
}

//Removes current results from page and loads in new results
function replaceResults(url, newResults, resultsText) {
    $('.results').empty();
    $(newResults).hide().appendTo('.results').fadeIn(300);

    //Build any sparklines that might show on search results
    jsEnhanceSparkline();
    jsEnhanceTimeSeriesTool();

    //Update results text
    var resultsTextElem = $('.search-page__results-text');
    resultsTextElem.empty();
    resultsTextElem.append(resultsText);

    //Pushes new url into browser, if browser compatible (enhancement)
    if (typeof (history.pushState) != undefined) {
        window.history.pushState({}, '', url);
    }
}

//Update filters
function replaceFilters(filters) {
    if ($(filters).has('input[type="checkbox"]')) {
        //Detect what filters are being updated
        var checkboxId = $(filters).find('input').attr('id');

        //Find corresponding filters on current page
        var checkboxFilters = $('#' + checkboxId).closest('.js-checkbox-container');

        //Empty and replace checkboxes
        checkboxFilters.empty();
        checkboxFilters.append(filters);

    }

    if ($(filters).has('.js-atoz-container')) {
        //If page A-Z and no checkboxes
        var atozFilters = $('.filters__a-z');
        atozFilters.empty();
        atozFilters.append($(filters).html());
    }
}