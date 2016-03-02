$(function() {
    // Variables
    var domain = window.location.host,
        langSelect = $(".language.language--js select");

    // Detect which language is selected and hide other
    if (domain.match("^cy.")) {
        langSelect.val('welsh');
    }

    // Listen for change of select and navigate to new url
    langSelect.change(function() {
        window.location = $(this).find('option:selected').attr('data-url');
    });
});