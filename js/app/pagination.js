// Ajax in new results when pagination clicked

$(function() {
    var $paginationContainer = $('#results')

    //Bind pagination link click event
    if ($paginationContainer.length > 0) {
        $paginationContainer.on('click', 'a.page-link', function(e) {
            e.preventDefault();
            var url = $(e.target).attr('href');
            loadNewResults(url);
            $('html, body').animate({scrollTop: $('#main').offset().top}, 1000);
        });
    }
})
