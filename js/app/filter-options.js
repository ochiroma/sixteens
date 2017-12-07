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
            $("#error-container").append("<div id=\"options-error\" class=\"font-size--16 form-error filter-overview__error-message\">Add at least one to '" + errorDimensions + "'</div>")
        }
    })
});
