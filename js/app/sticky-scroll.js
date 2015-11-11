/**
 * Created by jon on 05/11/2015.
 */

$(function() {

    if ($('.js-sticky-sidebar').length > 0) {

        var $sidebar = $(".js-sticky-sidebar"),
            $window = $(window),
            offset = $sidebar.offset(),
            topPadding = 50;


        $window.scroll(function () {
            if ($window.scrollTop() > offset.top) {
                $sidebar.css({
                    marginTop: $window.scrollTop() - offset.top + topPadding
                });
            } else {
                $sidebar.stop().animate({
                    marginTop: 0
                });
            }
        });

    }

});

$.fn.isOnScreen = function(){

    var win = $(window);

    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

};



    $(window).scroll(function() {
        var scrollTop = $(window).scrollTop();
        var scrollBottom = scrollTop + $(window).height();

        $.each($(".section-container"), function() {

            var section = $(this),
                sectionHeight = section.height(),
                sectionName = section.attr('id'),
                sectionTitle = section.find('h2').attr('id'),
                offsetTop = section.offset().top,
                offsetBottom = section.offset().top + section.height();



            if ($(this).isOnScreen()) {
                var percentage = 0;

                if (scrollTop >= offsetTop && scrollTop < offsetBottom) {
                    percentage = ((offsetBottom - scrollTop) / sectionHeight) * 100;
                } else if (scrollBottom > offsetTop && scrollBottom < offsetBottom) {
                    percentage = ((scrollBottom - offsetTop) / sectionHeight) * 100;
                    //console.log("(offsetTop: " + offsetTop + "- scrollBottom: " + scrollBottom + ") / sectionHeight: " + sectionHeight)
                } else if ((scrollTop > offsetTop && scrollBottom < offsetBottom) || (scrollTop < offsetTop && scrollBottom > offsetBottom)) {
                    percentage = 100;
                } else {
                    percentage = 0;
                }

            } else {

                percentage = 0;

            }

            //console.log($(this).attr('id') + " - " + sectionHeight + ": " + percentage);
            //console.log(sectionTitle);

            bgTransparency = percentage / 100;
            //bgTransparency = bgTransparency.toFixed(1);


            $.each($(".side-bar__item"), function() {
                $("#" + sectionTitle + "-menu-item").css({'background-color': 'rgba(187,189,191,' + bgTransparency, "border-radius": "8px 0 0 8px"});

            });

    });

});