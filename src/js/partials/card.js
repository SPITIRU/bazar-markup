//card tabs
$('.js-card-tab-related').tabs();

$(document).on('click', '.js-related-tab', function() {
    $(this)
        .closest('.js-card-tab-related')
        .find('.js-bz-slider--related')
        .slick('setPosition');
});

// $('.js-card-tab-related')
//     .find('.tab__title')
//     .on('click', function() {
//         $(this)
//             .closest('.js-card-tab-related')
//             .find('.js-bz-slider--related')
//             .slick('setPosition');
//     });

if ($(window).width() > 480) {
    $(document).on('click', '.js-tab', tabs);
}

$('#preview').on('shown.bs.modal', function(e) {
    $('.js-bz-slider--card').resize();
});

//tabs ---> accordeon
function tabTransform() {
    var tab = $('.js-tab--transform');

    $('.js-tab')
        .unwrap()
        .addClass('accordeon accordeon--other js-accordeon')
        .removeClass('tab__titles');
    tab.find('.tab__title')
        .addClass('accordeon__title')
        .removeClass('tab__title is-active')
        .wrap('<div class="accordeon__item">');

    tab.find('[data-tab-content="0"]')
        .removeAttr('style')
        .insertAfter('[data-tab="0"]')
        .parent()
        .addClass('is-open');
    tab.find('[data-tab-content="1"]')
        .css('display', 'none')
        .insertAfter('[data-tab="1"]');

    tab.find('.tab__content')
        .addClass('accordeon__content')
        .removeClass('tab__content tab__content--product');
    tab.find('.tab__contentes').remove();
}

if ($(window).width() <= 480) {
    tabTransform();
}

//Card Item Select
changeColor();

$(document).on('click', '.js-item-select', function() {
    if ($(this).hasClass('is-active')) {
        $('.js-item-select').removeClass('is-active');
        $(this).removeClass('is-active');
    } else {
        $('.js-item-select').removeClass('is-active');
        $(this).addClass('is-active');
    }
});

$(document).on('click', function(e) {
    if ($(e.target).closest('.js-item-select').length) return;
    $('.js-item-select').removeClass('is-active');
    e.stopPropagation();
});

$(document).on('click', '.js-item-select-item', function() {
    let select = $(this).closest('.js-item-select');
    let text = $(this)
        .find('.item-select__title')
        .text();
    let color = $(this)
        .find('.item-select__color')
        .data('item-select-color');
    let value = select.find('.item-select__value');
    let input = select.find('.item-select__input');

    input.val(text);
    value.children('.item-select__color').data('item-select-color', color);

    changeColor();

    if (select.hasClass('item-select--count')) {
        if ($(this).hasClass('item-select__item--header')) {
            value
                .children('.item-select__title')
                .removeAttr('style')
                .text('Выбрать');
            input.css('display', 'none');
        } else {
            input.removeAttr('style');
            value.children('.item-select__title').css('display', 'none');
        }
    }
});
