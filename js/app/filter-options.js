$(document).ready(function() {
    $("#preview-download").click(function(e) {
        var errorDimensions = [];

        $("li#filter-option").each(function() {
            var filterDiv = $(this).find("a");

            if (filterDiv.html().includes("Add at least one")) {
                e.preventDefault();
                $(this).addClass("filter-overview__error");
                var label = $(this).find("#filter-option-label").html();
                if (errorDimensions.length > 0) {
                    label = " " + label;
                }
                errorDimensions.push(label);
            }
        })

        if (errorDimensions.length > 0 && $("#options-error").length === 0) {
            $("#options-info").append("<div id=\"options-error\" class=\"margin-left--1 margin-bottom--1 font-size--16 form-error\">Add at least one to '" + errorDimensions + "'</div>")
        }
    })
})