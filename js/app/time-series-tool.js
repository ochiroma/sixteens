var timeseriesTool = (function () {

    var listContainer = $("#timeseries-list-container"),
        resultsContainer = $("#results"),
        xlsForm = $("#xls-form"),
        csvForm = $("#csv-form"),
        list = $("#timeseries-list"),
        timeseriesList = {};

        bindEvents();

    //init timeseries tool
    function bindEvents() {
        resultsContainer.on("click", ".js-timeseriestool-select", function() {
            console.debug("Toggling checkbox...")
            var checkbox = $(this);
            if (checkbox.prop('checked')) {
                select(checkbox);
            } else {
                deselect(checkbox);
                uncheck($('.js-timeseriestool-select-all'));//uncheck select all if a time series is deselected
            }
        });

        resultsContainer.on("click", ".js-timeseriestool-select-all", function() {
            var selectall = $(this);
            console.debug("Toggling select all...")
            if (selectall.prop('checked')) {
                selectAll();
            } else {
                deselectAll();
            }
        });

        list.on("click", ".js-remove-selected", function() {
            console.debug("Removing...")
            var listElement = $(this).closest('li');
            deselect(listElement);
            uncheck(findIn(resultsContainer, cdid(listElement)));
        });


    }

    function selectAll() {
         getAllChecboxes().each(function() {
            var element = $(this);
            select(element);
            check(element);
         });
    }

    function deselectAll() {
         getAllChecboxes().each(function() {
            var element = $(this);
            deselect(element);
            uncheck(element);
         });
    }

    function select(element) {
        addTimeSeries(element);
    }

    function deselect(element) {
        removeTimeSeries(element);
    }

    //Uncheck result with given cdid
    function uncheck(element) {
        element.prop('checked', false);
    }

    function check(element) {
        element.prop('checked', true);
    }

    //Add time series to forms and lists
    function addTimeSeries(element) {
        var uri = element.data('uri'),
            id = cdid(element),
            title = element.data('title');

        if (timeseriesList.hasOwnProperty(uri)) {
            return; // it is already in the list    
        }
        timeseriesList[uri] = "";
        list.prepend(getListElementMarkup(uri, id, title));
        var inputMarkup = getInputMarkup(id, uri);
        xlsForm.append(inputMarkup);
        csvForm.append(inputMarkup);
        listContainer.show();
    }

    //Remove time series from forms and lists
    function removeTimeSeries(element) {
        var id = cdid(element),
            uri = element.data('uri');
        delete timeseriesList[uri];
        removeTimeseries(list, id);
        removeTimeseries(xlsForm, id);
        removeTimeseries(csvForm, id);
        if (count(timeseriesList) === 0) {
            listContainer.hide();
        }
    }

    function getListElementMarkup(uri, cdid, title) {
        return '<li data-cdid="' + cdid + '" class="flush" data-uri="' + uri + '"><p class="flush">' + title + ' <button class="btn btn--primary btn--thin btn--small btn--narrow float-right js-remove-selected">remove</button></p></li>';
    }

    function getInputMarkup(cdid, uri) {
        return '<input type="hidden" name="uri" data-cdid="' + cdid + '" value="' + uri + '"/>';
    }

    //Remove time series with given cdid in given parent element
    function removeTimeseries(element, cdid) {
        findIn(element,cdid).remove();
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
        var elem =  parent.find('[data-cdid="' + cdid +'"]');
        return elem;
    }

    //returns cdid data attribute of element
    function cdid(element) {
        return element.data('cdid');
    } 

    //Checks all elements in basket on result list after results are refreshed
    function checkSelectedTimeseries() {
        getAllChecboxes().each(function() {
            checkbox = $(this);
            if(timeseriesList.hasOwnProperty(checkbox.data('uri'))){
                check(checkbox);
            }
        });
    }

    //expose functions
    return {
        refreshSelections:checkSelectedTimeseries
    };

})();
