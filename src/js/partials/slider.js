// //Slick Slider https://kenwheeler.github.io/slick/
//Slider New
if ($('.js-bz-slider--new').length > 0) {
    $('.js-bz-slider--new').slick({
        nextArrow: '.bz-slider__arrow--next',
        prevArrow: '.bz-slider__arrow--prev',
        arrows: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        speed: 1000,
        autoplaySpeed: 5000,
        autoplay: true,
        dots: false,
        // variableWidth: true,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 426,
                settings: {
                    slidesToShow: 2,
                    autoplay: false,
                    variableWidth: false,
                    arrows: false
                }
            },
            {
                breakpoint: 376,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 321,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
}

//Slider Card
if (
    $('.js-bz-slider--card').length > 0 &&
  $('.js-bz-slider--card-nav').length > 0
) {
    $('.js-bz-slider--card').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.js-bz-slider--card-nav',
        responsive: [
            {
                breakpoint: 481,
                settings: {
                    dots: true,
                    fade: false
                }
            }
        ]
    });
    $('.js-bz-slider--card-nav').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        asNavFor: '.js-bz-slider--card',
        dots: true,
        centerMode: true,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    centerMode: false
                }
            },
            {
                breakpoint: 481,
                settings: 'unslick'
            }
        ]
    });
}

//Slider Promo
if ($('.js-bz-slider--promo').length > 0) {
    $('.js-bz-slider--promo').slick({
        nextArrow: '.bz-slider-promo__arrow--next',
        prevArrow: '.bz-slider-promo__arrow--prev',
        arrows: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        autoplaySpeed: 5000,
        autoplay: true,
        dots: true
    });
}

//Slider Related
if ($('.js-bz-slider--related').length > 0) {
    $('.js-bz-slider--related').slick({
        arrows: true,
        infinite: true,
        slidesToShow: 8,
        slidesToScroll: 1,
        speed: 500,
        autoplaySpeed: 5000,
        autoplay: true,
        dots: false,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 6
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 5
                }
            },
            {
                breakpoint: 481,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 376,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });
}
