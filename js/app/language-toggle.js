
$(function() {
    // Find language <select> markup
    var langSelect = $(".language.language--js select");

    // Listen for change of select and navigate to new url
    langSelect.change(function() {
        window.location = $(this).find('option:selected').attr('data-url');
    });
});