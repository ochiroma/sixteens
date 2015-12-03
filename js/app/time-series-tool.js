var timeseriesTool = (function() {

    var listContainer = $("#timeseries-list-container"),
        resultsContainer = $("#results"),
        xlsForm = $("#xls-form"),
        csvForm = $("#csv-form"),
        list = $("#timeseries-list"),
        timeseriesList = {},
        basetCookieName = 'timeseriesbasket',
        rememberCookieName = 'rememberBasket',
        remember;

    bindEvents();
    initialize();

    function initialize() {
        remember = getCookie(rememberCookieName);
        if(typeof remember === 'undefined') {//remember cookie never set, sets to true by default
            remember=true;
            setCookie(rememberCookieName, remember);
        }

        if(remember) {
            timeseriesList = Cookies.getJSON(basetCookieName) || {};
            $.each(timeseriesList, function(index, value) {
                addToPage(value);
            });
            check($('#remember-selection'));    
        }
    }

    function updateCookie() {
        setCookie(basetCookieName, timeseriesList);
    }

    //init timeseries tool
    function bindEvents() {
        resultsContainer.on("click", ".js-timeseriestool-select", function() {
            var checkbox = $(this);
            if (checkbox.prop('checked')) {
                select(checkbox);
            } else {
                deselect(checkbox);
            }
        });

        resultsContainer.on("click", ".js-timeseriestool-select-all", function() {
            var selectall = $(this);
            if (selectall.prop('checked')) {
                selectAll();
            } else {
                deselectAll();
            }
        });

        listContainer.on("click", "#remember-selection", function() {
            var rememberSelectionInput = $(this);
            if (rememberSelectionInput.prop('checked')) {
                setCookie(rememberCookieName, true);
            } else {
                setCookie(rememberCookieName, false);
                deleteCookie(basetCookieName);
            }
        });

        list.on("click", ".js-remove-selected", function() {
            var listElement = $(this).closest('li');
            var checkbox = findIn(resultsContainer, getCdid(listElement));
            deselect(checkbox);
        });
    }

    function selectAll() {
        getAllChecboxes().each(function() {
            var element = $(this);
            select(element);
        });
    }

    function deselectAll() {
        getAllChecboxes().each(function() {
            var element = $(this);
            deselect(element);
        });
    }

    function select(element) {
        addTimeSeries(element);
        check(element);
    }

    function deselect(element) {
        removeTimeSeries(element);
        uncheck(element);
        uncheck($('.js-timeseriestool-select-all')); //uncheck select all if a time series is deselected
    }

    //Uncheck result with given cdid
    function uncheck(element) {
        element.prop('checked', false);
    }

    function check(element) {
        element.prop('checked', true);
    }

    //runs when time series checkbox checked
    function addTimeSeries(element) {
        var timeseries = {
            uri: element.data('uri'),
            cdid: getCdid(element),
            title: element.data('title')
        };

        if (timeseriesList.hasOwnProperty(timeseries.cdid)) {
            return; // it is already in the list    
        }
        timeseriesList[timeseries.cdid] = timeseries;
        addToPage(timeseries);
        updateCookie();

    }

    //Add time series markup to basket, and put hidden inputs for download
    function addToPage(timeseries) {
        list.prepend(getListElementMarkup(timeseries));
        var inputMarkup = getInputMarkup(timeseries);
        xlsForm.append(inputMarkup);
        csvForm.append(inputMarkup);
        listContainer.show();
    }

    //Remove time series from forms and lists
    function removeTimeSeries(element) {
        var id = getCdid(element),
            uri = element.data('uri');
        delete timeseriesList[id];
        remove(list, id);
        remove(xlsForm, id);
        remove(csvForm, id);
        if (count(timeseriesList) === 0) {
            listContainer.hide();
        }
        updateCookie();
    }

    function getListElementMarkup(timeseries) {
        return '<li data-cdid="' + timeseries.cdid + '" class="flush" data-uri="' + timeseries.uri + '"><p class="flush">' + timeseries.title + ' <button class="btn btn--primary btn--thin btn--small btn--narrow float-right js-remove-selected">remove</button></p></li>';
    }

    function getInputMarkup(timeseries) {
        return '<input type="hidden" name="uri" data-cdid="' + timeseries.cdid + '" value="' + timeseries.uri + '"/>';
    }

    //Remove time series with given cdid in given parent element
    function remove(element, cdid) {
        findIn(element, cdid).remove();
    }

    function count(o) {
        var c = 0;
        for (var p in o) {
            if (o.hasOwnProperty(p)) ++c;
        }
        return c;
    }

    function getAllChecboxes() {
        return $(".js-timeseriestool-select");
    }

    function findIn(parent, cdid) {
        var elem = parent.find('[data-cdid="' + cdid + '"]');
        return elem;
    }

    //returns cdid data attribute of element
    function getCdid(element) {
        return element.data('cdid');
    }

    //re-initializes various fields on js refresh of results
    function refresh() {
        resolveCustomDateFilter();

        //Checks all elements in basket on result list after results are refreshed
        getAllChecboxes().each(function() {
            checkbox = $(this);
            if (timeseriesList.hasOwnProperty(checkbox.data('cdid'))) {
                check(checkbox);
            }
        });
        showSelectAll(); //select all button is hidden by defaul, only shown when js available. Have to show each time results are refreshed
    }

    function showSelectAll() {
        $('#select-all-container').show();
    }

    function resolveCustomDateFilter() {
        var val = $('#select-updated').val();
        var fromTo = $('.js-from-to-filters');
        if ('custom' === val) {
            fromTo.show();
        } else {
            fromTo.hide();
        }
    }

    function getCookie(name) {
        return Cookies.getJSON(name);
    }

    function setCookie(name, value) {
        Cookies.set(name, value, {
            expires: (10 * 365),
            path: ''
        });
    }

    function deleteCookie(name, value) {
        Cookies.remove(name, {path: ''});
    }

    //expose functions
    return {
        refresh: refresh
    };

})();