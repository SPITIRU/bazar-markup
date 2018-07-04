$(document).on('click', '.js-color-item', function(e) {
    let item = $(this).closest('.js-product-item');
    let color = $(this).data('color');
    let img = item.find('.product-item__image');

    img.attr('src', color);
    e.preventDefault();
});

//Changer
$('.js-changer')
    .find('.changer__item')
    .on('click', function() {
        if ($(this).hasClass('is-checked')) {
            return;
        } else {
            $('.js-changer')
                .find('.changer__item')
                .removeClass('is-checked');
            $(this).addClass('is-checked');
            return;
        }
    });

$('.js-changer')
    .find('.changer__reset')
    .on('click', function(e) {
        let item = $(this).parent('.changer__item');
        if (item.hasClass('is-checked')) {
            item.removeClass('is-checked');
        }
        e.stopPropagation();
    });

$('.js-catalog-filter-item')
    .find('.catalog-filter__subitem')
    .each(function() {
        var colorBox = $(this).find('.catalog-filter__color');
        var color = colorBox.data('filter-color');
        colorBox.css('background-color', color);
    });

if ($(window).width() <= 480) {
    $('.js-catalog-filter-item')
        .find('.catalog-filter__content')
        .removeClass('js-scroll');
} else {
    $('.js-catalog-filter-item')
        .find('.catalog-filter__content')
        .getNiceScroll()
        .resize();
}

//Catalog Filter Action
$('.js-catalog-filter--show').on('click', function() {
    $('.js-catalog-filter').addClass('is-visible');
    document.documentElement.style.overflow = 'hidden';
});
$('.js-catalog-filter--hide').on('click', function() {
    $('.js-catalog-filter').removeClass('is-visible');
    document.documentElement.style = '';
});

//Sticky Block https://github.com/abouolia/sticky-sidebar
if ($('.js-stiky').length > 0 && $(window).width() > 768) {
    var sidebar = new StickySidebar('.js-stiky', {
        topSpacing: 85,
        bottomSpacing: 20,
        containerSelector: '.stiky-content',
        innerWrapperSelector: '.stiky-inner'
    });
}
