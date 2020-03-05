// cookies settings
var oneYearInSeconds = 31622400
var url = window.location.hostname
var cookiesDomain = extractDomainFromUrl(url)

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

    document.cookie = "cookies_preferences_set=true; max-age=" + oneYearInSeconds + ";" + "domain=" + cookiesDomain + ";"
    document.cookie = "cookies_policy=%7B%22essential%22%3Atrue%2C%22usage%22%3Atrue%7D; max-age=" + oneYearInSeconds + ";" + "domain=" + cookiesDomain + ";"

    $('.js-cookies-banner-inform').addClass('hidden')
    $('.js-cookies-banner-confirmation').removeClass('hidden')
}

function extractDomainFromUrl(url) {
    if (url.includes('localhost')) {
        return 'localhost'
    }

    // top level domains (TLD/SLD) in use
    var tlds = new RegExp('(.co.uk|.gov.uk)')

    var topLevelDomain = url.match(tlds)[0]
    var secondLevelDomain = url.replace(topLevelDomain, '').split('.').pop()

    return "." + secondLevelDomain + "." + topLevelDomain
}

$(function() {
    initCookiesBanner();
});