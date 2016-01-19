// Change search filters in mobile to show/hide
function mobileFilters(remove) {
    var $filters = $('.js-mobile-filters'),
        $filtersTitle = $('.js-mobile-filters__title'),
        $contents = $('.js-mobile-filters__contents'),
        $clearFilters = $filters.find('a[value="Reset"]'),
        $sortBy = $('.js-mobile-filters__sort');


    if (!remove) {
        $filters.addClass('js-show-hide show-hide show-hide--light').removeClass('tiles__item tiles__item--nav-type');
        $filtersTitle.addClass('mobile-filters__title js-show-hide__title show-hide__title').removeClass('tiles__title-h3 tiles__title-h3--nav');
        $contents.addClass('mobile-filters__contents js-show-hide__contents').removeClass('tiles__content tiles__content--nav');
        $clearFilters.prependTo($contents);
        $sortBy.prependTo($contents).css('display', 'inline-block');
    } else {
        $filters.removeClass('js-show-hide show-hide show-hide--light').addClass('tiles__item tiles__item--nav-type');
        $filtersTitle.removeClass('mobile-filters__title js-show-hide__title show-hide__title').addClass('tiles__title-h3 tiles__title-h3--nav');
        $contents.removeClass('mobile-filters__contents js-show-hide__contents');
        $clearFilters.prependTo($filtersTitle);
        $sortBy.prependTo('#form-sort').css('display', 'block');
    }
};

function mobileViewport() {
    return $('.js-mobile-filters').length > 0 && $('body').is('.viewport-sm');
}

// On page load
$(function() {
    if (mobileViewport()) {
        mobileFilters();
        showHide();
    }
});

// On window resize
$(window).on('resize orientationChange', function() {
    if (!mobileViewport()) {
        showHide(true);
        mobileFilters(true);
    } else {
        mobileFilters();
        showHide();
    }
});