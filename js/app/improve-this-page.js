$(document).ready(function() {
    var pageURL = window.location.href;

    $( "#feedback-form-url" ).val(pageURL);

    $( "a.js-toggle" ).click(function(e) {
        e.preventDefault();

        var id = $(this).attr('id');
        $( "#feedback-form" ).toggleClass("js-hidden");
        $( "#feedback-form-header" ).toggleClass("js-hidden");

        if (id !== "feedback-form-close") {
            $(" #description-field ").focus();
        }
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