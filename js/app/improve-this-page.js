$(document).ready(function() {
    var pageURL = window.location.href;

    $( "#feedback-form-url" ).val(pageURL);

    $( "#feedback-form-no" ).click(function(e) {
        e.preventDefault();

        $( "#feedback-form" ).removeClass("js-hidden");
        $( "#feedback-form-header" ).addClass("js-hidden");
    });

    $( "#feedback-form-anything-wrong" ).click(function(e) {
        e.preventDefault();

        $( "#feedback-form" ).removeClass("js-hidden");
        $( "#feedback-form-header" ).addClass("js-hidden");
    });

    $( "#feedback-form-close" ).click(function(e) {
        e.preventDefault();

        $( "#feedback-form" ).addClass("js-hidden");
        $( "#feedback-form-header" ).removeClass("js-hidden");
    });

    $( "#feedback-form-yes" ).click(function(e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: "/feedback/positive",
            data: $("#feedback-form-container").serialize(),
            beforeSend: function() {
                $( "#feedback-form-header" ).html('Thanks for your feedback.');
            }
        })
    });

    $( "#feedback-form-container" ).on("submit", function(e) {
        e.preventDefault();

        if ($(" #description-field ").val() === "") {
            var descriptionError = "<span class=\"form-error\">Description can't be blank</span>";
            if (!$(" #description-field-label ").html().includes(descriptionError)) {
                $(" #description-field-label ").append( descriptionError );
                $(" #description-field ").addClass("form-control__error");
            }
            return;
        }

        $.ajax({
            type: "POST",
            url: "/feedback",
            data: $("#feedback-form-container").serialize(),
            beforeSend: function() {
                $( "#feedback-form" ).addClass("js-hidden");
                $( "#feedback-form-header" ).removeClass("js-hidden");
                $( "#feedback-form-header" ).html('Thanks for your feedback.');
            }
        })
    });

    
});