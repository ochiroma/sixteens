/**
 * Created by jon on 05/11/2015.
 */

//$('.js-sticky-scroll .js-sticky-scroll__title').each(function (){
//
//    var title = $(this);
//
//    console.log(title);
//
//});

$(function() {

    var $sidebar   = $(".js-sticky-sidebar"),
        $window    = $(window),
        offset     = $sidebar.offset(),
        topPadding = 50;


    $window.scroll(function() {
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

});

// init controller
var controller = new ScrollMagic.Controller();

//// build scenes
//new ScrollMagic.Scene({triggerElement: "#highlights"})
//    .setClassToggle("#high1", "side-bar__active") // add class toggle
//    .addTo(controller)
//    .triggerHook(0.9)
//    .duration($("#highlight-container").height())
//console.log($("#highlight-container").height());
//new ScrollMagic.Scene({triggerElement: "#timeseries"})
//    .setClassToggle("#high2", "side-bar__active") // add class toggle
//    .addTo(controller)
//    .triggerHook(0.9)
//    .duration($("#timeseries-container").height())
//new ScrollMagic.Scene({triggerElement: "#datasets"})
//    .setClassToggle("#high3", "side-bar__active") // add class toggle
//    .addTo(controller)
//    .triggerHook(0.9)
//    .duration(1100);
//new ScrollMagic.Scene({triggerElement: "#commissioned"})
//    .setClassToggle("#high4", "side-bar__active") // add class toggle
//    .addTo(controller)
//    .triggerHook(0.9)
//    .duration(400);
//new ScrollMagic.Scene({triggerElement: "#publications"})
//    .setClassToggle("#high5", "side-bar__active") // add class toggle
//    .addTo(controller)
//    .triggerHook(0.9)
//    .offset(300)
//    .duration(1000);


$.each($(".section-container"), function(index) {
    console.log($(this).height());
    var title = $(this).find(".section-title").attr('id');
    console.log(title);
    new ScrollMagic.Scene({triggerElement: "#" + title})
        .setClassToggle("#high" + (index + 1), "side-bar__active") // add class toggle
        .addTo(controller)
        .triggerHook(0.9)
        .duration($("#" + title + "-container").height() + 20)
});