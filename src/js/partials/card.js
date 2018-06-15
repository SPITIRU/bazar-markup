$('.js-bz-slider--card').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.js-bz-slider--card-nav'
});
$('.js-bz-slider--card-nav').slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    asNavFor: '.js-bz-slider--card',
    dots: true,
    centerMode: true,
    focusOnSelect: true
});

//card tabs
$('.js-card-tab-info').tabs();
$('.js-card-tab-related').tabs();