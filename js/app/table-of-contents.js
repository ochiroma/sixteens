$(function() {


    if ($('body').contents().find('*').hasClass('page-content__main-content')) {
        var pageContent = '.page-content__main-content';

        //remove html and body height 100% to allow jquery scroll functions to work properly
        $('html, body').css('height', 'auto');


        //insert sticky wrapper
        var tocStickyWrap = $('<div class="table-of-contents--sticky__wrap print--hide"><div class="wrapper">');
        $(tocStickyWrap).insertAfter($('#toc'));
        $('.table-of-contents--sticky__wrap .wrapper').append('<h2 class="table-of-contents--sticky__heading">Table of contents</h2>');


        //create select list of sections
        var tocSelectList = $('<select class="table-of-contents--sticky__select ">');

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

        //Height of sticky toc in pixels
        var stickyTocHeight = 96;

        //add toc select to sticky wrapper
        $('.table-of-contents--sticky__wrap .wrapper').append(tocSelectList);

        $('.table-of-contents--sticky__select').change(function() {
            var location = $(this).find('option:selected').val();
            if (location) {
                // expands section if accordion
                var section = $(location);
                if (section.hasClass('is-collapsed')) {
                    section.removeClass('is-collapsed').addClass('is-expanded');
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
            var contentStart = $(pageContent).offset().top;
            var scrollTop = $(window).scrollTop();
            // console.log(scrollTop);
            if (scrollTop > contentStart) {
                $('#toc').addClass('table-of-contents-ordered-list-hide');
                // $('#toc').removeClass('table-of-contents-ordered-list');
                $(pageContent).css('padding-top', stickyTocHeight);
                $('.table-of-contents--sticky__wrap').show();
                //updateSelected()
            } else {
                // $('#toc').addClass('table-of-contents-ordered-list');
                $('#toc').removeClass('table-of-contents-ordered-list-hide');
                $(pageContent).css('padding-top', '0');
                $('.table-of-contents--sticky__wrap').hide();
            }
        }

        //store all sections and their start/end points for dynamically updating drop-down on scroll
        var sectionsArray = [];
        $(pageContent + ' section').each(function() {
            var $this = $(this);
            var sectionStart = $this.offset().top;
            var sectionHeight = $this.height();
            var sectionEnd = sectionStart - sectionHeight;
            var sectionId = $this.attr('id');
            //console.log(sectionStart);
            //console.log(sectionEnd);
            //console.log("||");
            sectionsArray.push({
                start: sectionStart,
                end: sectionEnd,
                id: sectionId
            });
        });
        //console.log(sectionsArray);
        //
        //function updateSelected() {
        //
        //}

        stickyTOC();
        $(window).scroll(function() {
            stickyTOC();
        });
    }
})