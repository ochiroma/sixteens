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
                $( "#feedback-form-header" ).html('Thank you. Your feedback will help us as we continue to improve the service.');
            }
        })
    });

    $( "#feedback-form-container" ).on("submit", function(e) {
        e.preventDefault();

        if ($(" #description-field ").val() === "") {
            var descriptionError = "<span class=\"form-error\">Write some feedback</span>";
            if (!$(" #description-field-label ").html().includes(descriptionError)) {
                $(" #description-field-label ").append( descriptionError );
                $(" #description-field ").addClass("form-control__error");
            }
            return;
        }

        if ($(" #purpose-field ").val() === "") {
            var descriptionError = "<span class=\"form-error\">Enter a purpose</span>";
            if (!$(" #purpose-field-label ").html().includes(descriptionError)) {
                $(" #purpose-field-label ").append( descriptionError );
                $(" #purpose-field ").addClass("form-control__error");
            }
            return;
        }

        var email = $(" #email-field ").val();
        if (email != "") {
            var emailError = "<span class=\"form-error\">This is not a valid email address, correct it or delete it</span>";
            var emailReg = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/g;

            if ( !emailReg.test(email) ) {
                if (!$(" #email-field-label ").html().includes(emailError)) {
                    $(" #email-field-label ").append( emailError );
                    $(" #email-field ").addClass("form-control__error");
                }
                return;
            }
        }

        $.ajax({
            type: "POST",
            url: "/feedback",
            data: $("#feedback-form-container").serialize(),
            beforeSend: function() {
                $( "#feedback-form" ).addClass("js-hidden");
                $( "#feedback-form-header" ).removeClass("js-hidden");
                $( "#feedback-form-header" ).html('Thank you. Your feedback will help us as we continue to improve the service.');
            }
        })

        if (window.location.pathname === "/feedback") {
            $(this).remove();
            $("h1").html("Thank you");
            var displayURL = document.referrer;
            var len = displayURL.length;
            console.log(len);
            if (len > 50) {
                displayURL = "..." + displayURL.slice(len - 50, len);
            }
            $("#feedback-description").html("<br>Your feedback will help us to improve the website.<br>We are unable to respond to all enquiries. If your matter is urgent, please <a href=\"/aboutus/contactus\">contact us</a>.<br><br>Return to <a class=\"underline-link\" href=\""+document.referrer+"\">"+displayURL+"</a>")
        }
    });

    
});