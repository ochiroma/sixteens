// enhanced cookie banner needs to:
// 1. on 'Accept All', send a request to the cookies controller designating that all cookies are to be accepted
// 2. set cookies_preferences_set=true; cookies_policy={essential: true, usage: true}
// 3. Success message

function initCookiesBanner() {
    $('.js-hide-cookies-banner').click(function(e) {
        $('.js-cookies-banner-form').addClass("hidden");
    })
    $(".js-cookies-banner-form").on('submit', submitCookieForm)
}

function submitCookieForm(e) {
    e.preventDefault();
    $('.js-accept-cookies').prop('disabled')
    $('.js-accept-cookies').addClass("btn--primary-disabled")
    $.ajax({
        type: "GET",
        url: "/cookie/accept-all",
        error: function (error) {
            console.log('Error with accepting all cookies:', error.statusText);
            $('.js-accept-cookies').removeProp('disabled')
            $('.js-accept-cookies').removeClass("btn--primary-disabled")
        },
        success: function(result) {
            // to update once endpoint is available
            document.cookie = result.cookies_policy
            $('.js-cookies-banner-inform').addClass('hidden')
            $('.js-cookies-banner-confirmation').removeClass('hidden')
        }
    });
}

$(function() {
    initCookiesBanner();
});