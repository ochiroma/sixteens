/**
 * Created by crispin on 10/12/2015.
 */
$(function() {
    $('div.pym-interactive').each(function(index, element) {
        new pym.Parent($(element).attr('id'), $(element).data('url'));
    });
});
