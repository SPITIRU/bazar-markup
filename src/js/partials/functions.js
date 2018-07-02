//PushUp
function pushUp(text) {
    var text = text || 'Товар добавлен в корзину';
    var pushContainer = $('<div>').addClass('bz-pushUp');
    var pushUpClose = $('<i class="fal fa-times"></i>').addClass(
        'bz-pushUp__close js-pushUp--close'
    );
    pushContainer.appendTo($('body'));
    pushContainer.text(text);
    pushUpClose.appendTo(pushContainer);

    raf(function() {
        pushContainer.addClass('is-active');
    });

    setTimeout(function() {
        pushContainer.removeClass('is-active');
    }, 3500);

    setTimeout(function() {
        pushContainer.remove();
    }, 4000);

    $(document).on('click', '.js-pushUp--close', function() {
        pushContainer.removeClass('is-active');
        setTimeout(function() {
            pushContainer.remove();
        }, 300);
    });
}

//RequestAnimationFrame
function raf(fn) {
    window.requestAnimationFrame(function() {
        window.requestAnimationFrame(function() {
            fn();
        });
    });
}

//CardSliderFunction
function cardSlider() {
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
        slidesToShow: 7,
        slidesToScroll: 1,
        asNavFor: '.js-bz-slider--card',
        dots: true,
        // centerMode: true,
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
