'use strict';
$(function () {
    var observer = new ResizeObserver(function (entries) {
        for (entry of entries) {
            var container = entry.target;
            var $container = $(container);
            var hasOverflow = container.scrollWidth > $container.width();
            if (!hasOverflow) {
                $container.removeClass('scrollable-container__overflow');
                continue;
            }
            console.log(entry.contentRect.height + 10);
            $container.addClass('scrollable-container__overflow');
        }
    });
    $('.scrollable-container').each(function (i, container) {
        $(container).wrap('<div class="scrollable-container__parent"></div>');
        observer.observe(container)
    });
});