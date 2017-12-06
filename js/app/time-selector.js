$(document).ready(function() {
    removeAllCheck();

    $(".checkbox__input").click(function() {
       removeAllCheck();
    })

    $("#add-all").click(function(e) {
        e.preventDefault();
        $(".checkbox__input").prop('checked', true);
        removeAllCheck();
    })

    $("#remove-all").click(function(e) {
        e.preventDefault();
        $(".checkbox__input").prop('checked', false);
        removeAllCheck();
    })

    var endDateChange = function() {
        if ($("#date-range-error-message").length > 0) {
            var data = $('#time-form').serializeArray().reduce(function(obj, item) {
                obj[item.name] = item.value;
                return obj;
            }, {});

            var endMonth = getMonthFromString(data["end-month"]);
            var startMonth = getMonthFromString(data["start-month"]);

            if ((endMonth >= startMonth && data["start-year"] <= data["end-year"]) || (data["start-year"] < data["end-year"])) {
                $("#multiple-choice-content-range").removeClass("multiple-choice__error");
                $("#date-range-error-message").remove();
            }
        }
    }

    $("#end-year").change(endDateChange)
    $("#end-month").change(endDateChange)

    $("#time-save-and-return").click(function(e) {
        var data = $('#time-form').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {}); 

        var selection = data["time-selection"];

        switch(selection) {
            case "single":
                if (data["month-single"] === "Select" || data["year-single"] === "Select") {
                    e.preventDefault();
                    $("#multiple-choice-content-single").addClass("multiple-choice__error");
                    if ($("#single-error-message").length === 0) {
                        $("#multiple-choice-content-single").prepend("<div id=\"single-error-message\" class=\"margin-left--1 margin-bottom--1 font-size--16 form-error\"><strong>Select month and year</strong></div>");
                    }
                }
                break;
            case "range":
                if (data["start-month"] === "Select" || data["start-year"] === "Select" || data["end-month"] === "Select" || data["end-year"] === "Select") {
                    e.preventDefault();
                    $("#multiple-choice-content-range").addClass("multiple-choice__error");
                    if ($("#range-error-message").length === 0) {
                        $("#multiple-choice-content-range").prepend("<div id=\"range-error-message\" class=\"margin-left--1 margin-bottom--1 font-size--16 form-error\"><strong>Select a range</strong></div>");
                    }
                    break;
                }
                var endMonth = getMonthFromString(data["end-month"]);
                var startMonth = getMonthFromString(data["start-month"]);

                if (endMonth < startMonth && data["start-year"] === data["end-year"]) {
                    e.preventDefault();
                    $("#multiple-choice-content-range").addClass("multiple-choice__error");
                    if ($("#date-range-error-message").length === 0) {
                        $("#multiple-choice-content-range").prepend("<div id=\"date-range-error-message\" class=\"margin-left--1 margin-bottom--1 font-size--16 form-error\"><strong>End date must be after the start date</strong></div>");
                        $("#range-error-message").remove();
                    }
                }
                break;
            case "list":
                if ($(".checkbox__input:checked").length === 0) {
                    e.preventDefault();
                    $("#multiple-choice-content-list").addClass("multiple-choice__error");
                    if ($("#list-error-message").length === 0) {
                        $("#multiple-choice-content-list").prepend("<div id=\"list-error-message\" class=\"margin-left--1 margin-bottom--1 font-size--16 form-error\"><strong>Select at least one time</strong></div>");
                    }
                    $('html, body').animate({
                        scrollTop: $("#multiple-choice-content-list").offset().top
                    }, 2000);
                }
        }
    })
})

function getMonthFromString(mon){
    return new Date(Date.parse(mon +" 1, 2012")).getMonth()+1
 }

function removeAllCheck() {
    if ($(".checkbox__input:checked").length > 1 ) {
        $("#remove-all").removeClass("js-hidden");
    } else {
        $("#remove-all").addClass("js-hidden");
    }
}