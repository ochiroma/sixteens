/**
 * Created by crispin on 20/11/2015.
 */
/* Load search/list results into a page without refreshing (eg when changing a filter) */

function loadNewResults(url) {
    $.ajax({
        url: url,
        success: function(result) {
            var newResults = $(result).find('.results').html();
            var resultsText = $(result).find('.search-page__results-text').html();

            if (resultsText) {
                replaceResults(url, newResults, resultsText);
            } else {
                replaceResults(url, newResults);
            }
        }
    });
}

//Removes current results from page and loads in new results
function replaceResults(url, newResults, resultsText) {
    $('.results').empty();
    $('.results').append(newResults);

    //Build any sparklines that might show on search results
    jsEnhanceSparkline();

    if (resultsText) {
        $('.search-page__results-text').empty();
        $('.search-page__results-text').append(resultsText);
    }

    //Pushes new url into browser, if browser compatible (enhancement)
    if (typeof (history.pushState) != undefined) {
        window.history.pushState({}, '', url);
    }
}