$(document).ready(function() {
    removeAllCheck();

    $(".checkbox__input").click(function() {
       removeAllCheck();
    })

    $("#add-all").click(function(e) {
        e.preventDefault();
        $(".checkbox__input").prop('checked', true);
        removeAllCheck();
    })

    $("#remove-all").click(function(e) {
        e.preventDefault();
        $(".checkbox__input").prop('checked', false);
        removeAllCheck();
    })
})

function removeAllCheck() {
    if ($(".checkbox__input:checked").length > 1 ) {
        $("#remove-all").removeClass("js-hidden");
    } else {
        $("#remove-all").addClass("js-hidden");
    }
}