$(function() {


    if ($('body').contents().find('*').hasClass('page-content__main-content')) {
        //variables
        var pageContent = '.page-content__main-content';
        var locationHash = $(location.hash).attr('id');
        var stickyTocHeight = 96; // height of sticky toc in pixels
        var tocSelectList = $('<select class="table-of-contents--sticky__select ">');
        var scrollTop = $(window).scrollTop();
        var contentStart = $(pageContent).offset().top;


        //remove html and body height 100% to allow jquery scroll functions to work properly
        $('html, body').css('height', 'auto');


        //insert sticky wrapper
        var tocStickyWrap = $('<div class="table-of-contents--sticky__wrap print--hide"><div class="wrapper"><div class="col-wrap"><div id="stickySelectArea" class="col col--md-30 col--lg-40">');
        $(tocStickyWrap).insertAfter($('#toc'));
        $('.table-of-contents--sticky__wrap #stickySelectArea').append('<h2 class="table-of-contents--sticky__heading">Table of contents</h2>');

        //add in print options
        var printStickyWrap = $('<div class="col col--md-15 col--lg-17 hide--mobile"><p class="text-right padding-top-md--0 padding-bottom-md--0 margin-bottom-md--1 print--hide"><a href="" id="jsEnhancePrint" class="link-complex nojs-hidden js-enhance--show">Print this page&nbsp;</a><span class="icon icon-print--dark-small"></span></p><p class="text-right padding-top-md--0 padding-bottom-md--1 margin-top-md--0 margin-bottom-md--0 print--hide js-enhance--show"><a href="{{uri}}/pdf" class="link-complex">Download as PDF&nbsp;</a><span class="icon icon-download--dark-small"></span></p></div>');
        $(printStickyWrap).insertAfter($('.table-of-contents--sticky__wrap .col'));


        //create select list of sections
        $(tocSelectList).append($('<option/>', {
            value: '',
            text: '-- Select a section --'
        }));

        $('#toc li a').each(function(i) {
            i = i + 1;
            var text = i + '. ' + $(this).text();
            var href = $(this).attr('href');
            $(tocSelectList).append($('<option/>', {
                value: href,
                text: text
            }));
        });

        //add toc select to sticky wrapper
        $('.table-of-contents--sticky__wrap #stickySelectArea').append(tocSelectList);

        $('.table-of-contents--sticky__select').change(function() {
            var location = $(this).find('option:selected').val();
            if (location) {
                // expands section if accordion
                if ($(location).hasClass('is-collapsed')) {
                    $(location).removeClass('is-collapsed').addClass('is-expanded');
                }

                var functionTrigger = true;

                //animates scroll and offsets page to counteract sticky nav
                $('html, body').animate({
                    scrollTop: $(location).offset().top - stickyTocHeight
                }, 1000, function() {
                    //stops function running twice - once for 'html' and another for 'body'
                    if (functionTrigger) {
                        //adds location hash to url without causing page to jump to it - credit to http://lea.verou.me/2011/05/change-url-hash-without-page-jump/
                        if (history.pushState) {
                            history.pushState(null, null, location);
                        }
                        //TODO Add hash to window.location in IE8-9 (don't support history.pushState)
                        // else {
                        //     window.location.hash = location;
                        //     $('html, body').scrollTop( $(location.hash).offset().top - 60 );
                        // }

                        var page = window.location.pathname + location;
                        jsEnhanceTriggerAnalyticsEvent(page);
                        functionTrigger = false;
                    }
                });
            }
        });


        // sticky toc function that evaluates scroll position and activates the sticky toc as appropriate
        function stickyTOC() {
            scrollTop = $(window).scrollTop();
            if (scrollTop > contentStart) {
                $('#toc').addClass('table-of-contents-ordered-list-hide');
                // $('#toc').removeClass('table-of-contents-ordered-list');
                $(pageContent).css('padding-top', stickyTocHeight);
                $('.table-of-contents--sticky__wrap').show();
                updateSelected(scrollTop);
            } else {
                // $('#toc').addClass('table-of-contents-ordered-list');
                $('#toc').removeClass('table-of-contents-ordered-list-hide');
                $(pageContent).css('padding-top', '0');
                $('.table-of-contents--sticky__wrap').hide();
            }
        }

        //Update the selected option on scroll
        function updateSelected(scrollTop) {
            var $sections = $(pageContent + ' section');
            var top = $.grep($sections, function(item) {
               return $(item).position().top <= scrollTop+stickyTocHeight;
            });
            var topLength = $(top).length;
            var activeSectionId = $($(top)[topLength - 1]).attr('id');
            if (activeSectionId) {
                $('.table-of-contents--sticky__select').val("#" + activeSectionId);
            }
        }

        //Offsets page to make room for sticky nav if arrive on page directly at section
        if (locationHash) {
            $(window).load(function() {
                $('html, body').scrollTop($('#' + locationHash).offset().top - stickyTocHeight);
            });
        }

        stickyTOC();
        updateSelected(scrollTop)
        $(window).scroll(function() {
            stickyTOC();
        });
    }
})