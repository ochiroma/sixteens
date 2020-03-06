var oneYearInSeconds = 31622400;

function initCookiesBanner() {
    $('.js-hide-cookies-banner').click(function(e) {
        $('.js-cookies-banner-form').addClass("hidden");
    });
    $(".js-cookies-banner-form").on('submit', submitCookieForm)
}

function submitCookieForm(e) {
    e.preventDefault();
    $('.js-accept-cookies').prop('disabled')
        .addClass("btn--primary-disabled");

    document.cookie = "cookies_preferences_set=true; max-age=" + oneYearInSeconds + ";";
    document.cookie = "cookies_policy=%7B%22essential%22%3Atrue%2C%22usage%22%3Atrue%7D; max-age=" + oneYearInSeconds + ";";

    $('.js-cookies-banner-inform').addClass('hidden');
    $('.js-cookies-banner-confirmation').removeClass('hidden');
}

$(function() {
    initCookiesBanner();
});