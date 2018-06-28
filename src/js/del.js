$(".js-item-select-control--plus").on("click", function(e) {
    let select = $(this).closest(".js-item-select");
    let input = select.find(".item-select__input");
    let value = select.find(".item-select__value");
    let curentVal = parseInt(input.val());
    let count = parseInt(input.val()) + 1 + " " + "м";

    input.removeAttr("style").val(count);

    if (curentVal > 0) {
        input.change();
    } else {
        input.val(1 + "м");
    }

    value.children(".item-select__title").css("display", "none");
    e.stopPropagation();
});

$(".js-item-select-control--minus").on("click", function() {
    let select = $(this).closest(".js-item-select");
    let input = select.find(".item-select__input");
    let value = select.find(".item-select__value");
    let curentVal = parseInt(input.val());
    let count = parseInt(input.val()) - 1 + " " + "м";

    if (curentVal > 1) {
        count = count < 1 ? 1 : count;
        input.val(count);
        input.change();
        select.removeClass("is-close");
    } else {
        value.children(".item-select__title").removeAttr("style");
        input.css("display", "none");
        select.removeClass("is-active");
    }
    return false;
});

//Search Hint
if ($(".js-search-input").length > 0) {
    var searchInput = $(".js-search-input");
    searchInput.on("keyup", function() {
        var hint = $(this)
            .closest(".js-search")
            .find(".search__hint");
        if ($(this).val() !== "") {
            hint.removeAttr("style");
        } else {
            hint.css("display", "none");
        }
    });
}
