/**
 * Created by crispin on 20/11/2015.
 */
/* Load search/list results into a page without refreshing (eg when changing a filter) */

//TODO - Set/cache reused selectors

function loadNewResults(url, clear) {
    $.ajax({
        url: url,
        success: function(result) {
            //Results
            var newResults = $(result).find('.results').html();
            var resultsText = $(result).find('.search-page__results-text').html();
            var pagination;
            if ($(result).has('#js-pagination-container')) {
                pagination = $(result).find('#js-pagination-container').html();
            }
            replaceResults(url, newResults, resultsText, pagination);

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
            // if ($(result).has('.js-from-to-filters')) {
            //     var fromToFilters = $(result).find('.js-from-to-filters');
            //     replaceFilters(fromToFilters);
            // }
            
            //Clear
            if (clear) {
                $('.filters input, select').each(function() {
                    var $this = '#' + $(this).attr('id');
                    updateContents(result, $this);
                })
            }
        }
    });
}

//Removes current results from page and loads in new results
function replaceResults(url, newResults, resultsText, pagination) {
    $('.results').empty();
    $(newResults).hide().appendTo('.results').fadeIn(300);

    //Build any sparklines that might show on search results
    jsEnhanceSparkline();
    jsEnhanceTimeSeriesTool();

    //Update results text
    var resultsTextElem = $('.search-page__results-text');
    resultsTextElem.empty();
    resultsTextElem.append(resultsText);

    //Update pagination for results
    if (pagination) {
        var paginationElem = $('#js-pagination-container');
        paginationElem.empty();
        paginationElem.append(pagination);
    } else {
        $('#js-pagination-container');
    }

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

    // if ($(filters).has('.js-from-to-filters')) {
    //     var fromToFilters = $('.js-from-to-filters');
    //     fromToFilters.hide();
    //     //fromToFilters.append($(filters).html());
    // }

}

//Remove and replaces content according to selector and results parsed into function - should probably re-use this elsewhere
function updateContents(result, id) {
    var newContents = $(result).find(id).html();
    var element = $(id);

    //Remove value if element is a search and has value
    if (element.is('input[type="search"]') && element.val()) {
        element.val('');
    } else { //else remove contents and replace with new
        element.empty();
        element.append(newContents);
    }

}